import { Injectable } from '@nestjs/common';
import { Class } from 'src/class/dto/class.dto';
import { firestore } from 'src/firebase.config';
import { Unit } from 'src/units/dto/unit.dto';

@Injectable()
export class ClassService {
  private classCollection = firestore.collection('classes');

  async getAllClasses(): Promise<{ total: number; data: any[] }> {
    const snapshot = await this.classCollection.get();
    const classes = snapshot.docs.map((doc) => ({
      classId: doc.id,
      ...doc.data(),
    }));
    const total = classes.length; // Total count of classes
    return { total: total, data: classes };
  }

  async getClassesByUnitId(
    unitId: string,
  ): Promise<{ total: number; data: any[] }> {
    const snapshot = await this.classCollection
      .where('unit.unitId', '==', unitId)
      .get();
    const classes = snapshot.docs.map((doc) => ({
      classId: doc.id,
      ...doc.data(),
    }));
    const total = classes.length; // Total count of classes
    return { total, data: classes };
  }

  async getClassById(classId: string): Promise<Class | { message: string }> {
    const classDoc = await this.classCollection.doc(classId).get();
    if (!classDoc.exists) {
      return { message: 'Không tìm thấy Id' };
    }
    return classDoc.data() as Class;
  }

  async createClass(classs: Class): Promise<Class> {
    try {
      let unit = null; // Mặc định unit sẽ là null

      // Nếu có unitId, lấy thông tin unit từ Firestore
      if (classs.unitId) {
        const unitRef = firestore.collection('units').doc(classs.unitId);
        const unitSnapshot = await unitRef.get();

        // Kiểm tra xem unit có tồn tại không
        if (!unitSnapshot.exists) {
          throw new Error('Mã khoa không tồn tại');
        }

        unit = unitSnapshot.data() as Unit;
      }

      // Tạo dữ liệu class với unit (null hoặc dữ liệu unit)
      const classData = {
        name: classs.name,
        phone: classs.phone,
        unit: unit, // Nếu không có unitId, unit sẽ là null
      };

      // Lưu dữ liệu class vào Firestore
      const newClassRef = await this.classCollection.add(classData);
      const classId = newClassRef.id;

      // Cập nhật id cho class
      await this.classCollection
        .doc(classId)
        .set({ classId: classId }, { merge: true });

      return { ...classData, classId: classId } as Class;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateClass(id: string, updatedData: Partial<Class>): Promise<Class> {
    try {
      const classRef = this.classCollection.doc(id);
      const classSnapshot = await classRef.get();

      if (!classSnapshot.exists) {
        throw new Error('Không tìm thấy Id');
      }

      const unitRef = firestore.collection('units').doc(updatedData.unitId);
      const unitSnapshot = await unitRef.get();
      if (!unitSnapshot.exists) {
        throw new Error('Mã khoa không tồn tại');
      }
      const currentClass = classSnapshot.data() as Class;
      const newClassDataa = {
        name: updatedData.name ?? currentClass.name,
        unitId: updatedData.unitId ?? currentClass.unitId,
        phone: updatedData.phone ?? currentClass.phone,
      };

      await classRef.update(newClassDataa);
      return { ...currentClass, ...newClassDataa };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteClass(id: string): Promise<{ message: string }> {
    try {
      const classRef = this.classCollection.doc(id);
      const classSnapshot = await classRef.get();

      if (!classSnapshot.exists) {
        throw new Error('Không tìm thấy Id');
      }

      await classRef.delete();
      return { message: 'Xóa thành công' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
