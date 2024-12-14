import { Injectable } from '@nestjs/common';
import { firestore } from 'src/firebase.config';
import { Teacher } from 'src/teacher/dto/teacher.dto';

@Injectable()
export class TeacherService {
  private teacherCollection = firestore.collection('teachers');
  collection: any;

  async getAllTeachers(): Promise<{ total: number; teachers: any[] }> {
    const snapshot = await this.teacherCollection.get();
    const teachers = snapshot.docs.map((doc) => ({
      teacherId: doc.id,
      ...doc.data(),
    }));
    const total = teachers.length; // Total count of teachers
    return { total, teachers };
  }

  async getTeacherById(
    teacherId: string,
  ): Promise<Teacher | { message: string }> {
    const teacherDoc = await this.teacherCollection.doc(teacherId).get();
    if (!teacherDoc.exists) {
      return { message: 'Không tìm thấy Id' };
    }
    return teacherDoc.data() as Teacher;
  }

  async createTeacher(teacher: Teacher): Promise<Teacher> {
    try {
      const classDataArray = [];

      // Lấy thông tin của tất cả các lớp từ classId
      if (teacher.classId && teacher.classId.length > 0) {
        for (const classId of teacher.classId) {
          const classRef = firestore.collection('classes').doc(classId);
          const classSnapshot = await classRef.get();

          // Nếu lớp tồn tại, thêm toàn bộ thông tin lớp vào mảng
          if (classSnapshot.exists) {
            classDataArray.push({
              classId: classSnapshot.id, // ID của lớp
              ...classSnapshot.data(), // Thông tin đầy đủ của lớp
            });
          } else {
            throw new Error(`Lớp với ID ${classId} không tồn tại.`);
          }
        }
      }

      // Dữ liệu của giáo viên, bao gồm cả thông tin các lớp đã lấy được
      const teacherData = {
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
        codePhone: teacher.codePhone,
        classes: classDataArray, // Thêm thông tin đầy đủ của các lớp vào đây
        photoUrl: teacher.photoUrl,
      };

      // Lưu dữ liệu giáo viên vào Firestore
      const newTeacherRef = await this.teacherCollection.add(teacherData);
      const teacherId = newTeacherRef.id;
      await this.teacherCollection
        .doc(teacherId)
        .set({ teacherId }, { merge: true });

      return { ...teacherData, teacherId } as Teacher;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateTeacher(
    teacherId: string,
    updateTeacherDto: Partial<Teacher>,
  ): Promise<Teacher> {
    try {
      const teacherRef = this.teacherCollection.doc(teacherId);
      const teacherSnapshot = await teacherRef.get();
      if (!teacherSnapshot.exists) {
        throw new Error('Không tìm thấy Id');
      }

      const teacherData = {
        name: updateTeacherDto.name,
        email: updateTeacherDto.email,
        phone: updateTeacherDto.phone,
        codePhone: updateTeacherDto.codePhone,
        classId: updateTeacherDto.classId,
        photoUrl: updateTeacherDto.photoUrl,
      };

      await teacherRef.set(teacherData, { merge: true });
      return { ...teacherData, teacherId } as Teacher;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteTeacher(teacherId: string): Promise<{ message: string }> {
    try {
      const teacherRef = this.teacherCollection.doc(teacherId);
      const teacherSnapshot = await teacherRef.get();
      if (!teacherSnapshot.exists) {
        throw new Error('Không tìm thấy Id');
      }
      await teacherRef.delete();
      return { message: 'Xóa thành công' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async changeCodePhone(teacherId: string, codePhone: string): Promise<Teacher> {
    try {
      const teacherRef = this.teacherCollection.doc(teacherId);
      const teacherSnapshot = await teacherRef.get();
      if (!teacherSnapshot.exists) {
        throw new Error('Không tìm thấy Id');
      }

      await teacherRef.set({ codePhone }, { merge: true });
      return { ...teacherSnapshot.data(), codePhone } as Teacher;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
