import { Injectable } from '@nestjs/common';
import { Admin } from 'src/admin/dto/admin.dto';
import { firestore } from 'src/firebase.config';

@Injectable()
export class AdminService {
  private adminCollection = firestore.collection('admins');
  collection: any;

  async getAllAdmins(): Promise<{ total: number; admins: any[] }> {
    const snapshot = await this.adminCollection.get();
    const admins = snapshot.docs.map((doc) => ({
      adminId: doc.id,
      ...doc.data(),
    }));
    const total = admins.length; // Total count of admins
    return { total, admins };
  }

  async getAdminById(adminId: string): Promise<Admin | { message: string }> {
    const adminDoc = await this.adminCollection.doc(adminId).get();
    if (!adminDoc.exists) {
      return { message: 'Không tìm thấy Id' };
    }
    return adminDoc.data() as Admin;
  }

  async createAdmin(admin: Admin): Promise<Admin> {
    try {
      const adminData = {
        name: admin.name,
        phone: admin.phone,
        email: admin.email,
        codePhone: admin.codePhone,
        photoUrl: admin.photoUrl,
      };
      const newAdminRef = await this.adminCollection.add(adminData);
      const adminId = newAdminRef.id;
      await this.adminCollection.doc(adminId).set({ adminId }, { merge: true });

      return { adminId, ...adminData } as Admin;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateAdmin(
    adminId: string,
    updateAdminDto: Partial<Admin>,
  ): Promise<Admin> {
    try {
      const adminRef = this.adminCollection.doc(adminId);
      const adminSnapshot = await adminRef.get();
      if (!adminSnapshot.exists) {
        throw new Error('Không tìm thấy Id');
      }
      const adminData = {
        name: updateAdminDto.name,
        phone: updateAdminDto.phone,
        email: updateAdminDto.email,
        codePhone: updateAdminDto.codePhone,
        photoUrl: updateAdminDto.photoUrl,
      };

      await adminRef.set(adminData, { merge: true });
      return { adminId, ...adminData } as Admin;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAdmin(adminId: string): Promise<{ message: string }> {
    try {
      const adminRef = this.adminCollection.doc(adminId);
      const adminSnapshot = await adminRef.get();
      if (!adminSnapshot.exists) {
        throw new Error('Không tìm thấy Id');
      }
      await adminRef.delete();
      return { message: 'Xóa thành công' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
