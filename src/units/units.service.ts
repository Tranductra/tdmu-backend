import { Injectable } from '@nestjs/common';
import { firestore } from '../firebase.config';
import { Unit } from 'src/units/dto/unit.dto';
import e from 'express';

@Injectable()
export class UnitsService {
  private unitCollection = firestore.collection('units');
  collection: any;

  // Get all units
  async getAllUnits(): Promise<{ total: number; data: any[] }> {
    const snapshot = await this.unitCollection.get();
    const units = snapshot.docs.map((doc) => ({
      unitId: doc.id,
      ...doc.data(),
    }));
    const total = units.length; // Total count of units
    return { total, data: units };
  }

  // Get unit by ID with error message if not found
  async getUnitById(unitId: string): Promise<Unit | { message: string }> {
    const unitDoc = await this.unitCollection.doc(unitId).get();
    if (!unitDoc.exists) {
      return { message: 'Không tìm thấy Id' };
    }
    return unitDoc.data() as Unit;
  }

  // Create a new unit
  async createUnit(unit: Unit): Promise<Unit> {
    try {
      // Chuyển đổi đối tượng Unit thành một đối tượng plain JavaScript
      const unitData = {
        name: unit.name,
        phone: unit.phone,
        email: unit.email,
        website: unit.website ?? null, // Nếu không có website, đặt là null
        facebook: unit.facebook ?? null, // Nếu không có facebook, đặt là null
        youtube: unit.youtube ?? null, // Nếu không có youtube, đặt là null
        keyword: unit.keyword,
      };

      // Lưu đối tượng plain vào Firestore
      const newUnitRef = await this.unitCollection.add(unitData);
      const unitId = newUnitRef.id;
      await this.unitCollection
        .doc(unitId)
        .set({ unitId: unitId }, { merge: true });

      return { ...unitData, unitId: unitId } as Unit;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUnit(id: string, updatedData: Partial<Unit>): Promise<Unit> {
    try {
      // Tìm kiếm Unit theo ID
      const unitRef = this.unitCollection.doc(id);
      const unitSnapshot = await unitRef.get();

      // Kiểm tra xem Unit có tồn tại hay không
      if (!unitSnapshot.exists) {
        throw new Error(`Mã đơn vị không tồn tại`);
      }

      // Lấy dữ liệu hiện tại của Unit
      const currentUnitData = unitSnapshot.data() as Unit;

      // Tạo object chứa dữ liệu cập nhật, các trường không có giá trị sẽ là null
      const newUnitData = {
        name: updatedData.name ?? currentUnitData.name, // Giữ nguyên nếu không nhập
        phone: updatedData.phone ?? currentUnitData.phone,
        email: updatedData.email ?? null, // Nếu không nhập email, đặt là null
        website: updatedData.website ?? null, // Nếu không nhập website, đặt là null
        facebook: updatedData.facebook ?? null,
        youtube: updatedData.youtube ?? null,
        keyword: updatedData.keyword ?? currentUnitData.keyword,
      };

      // Cập nhật Unit với dữ liệu mới
      await unitRef.update(newUnitData);

      // Trả về dữ liệu đã được cập nhật
      return { ...currentUnitData, ...newUnitData } as Unit;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Delete unit by ID with error message if not found
  async deleteUnit(unitId: string): Promise<{ message: string }> {
    const unitDoc = await this.unitCollection.doc(unitId).get();
    if (!unitDoc.exists) {
      return { message: 'Không tìm thấy Id' };
    }

    try {
      await this.unitCollection.doc(unitId).delete();
      return { message: 'Đơn vị đã được xóa thành công' };
    } catch (error) {
      throw new Error('Không thể xóa đơn vị');
    }
  }
}
