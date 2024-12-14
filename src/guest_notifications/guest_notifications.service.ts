import { Timestamp } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { timeStamp } from 'console';
import { firestore } from 'src/firebase.config';
import { GuestNotificationDto } from 'src/guest_notifications/dto/guest_nofitication.dto';

@Injectable()
export class GuestNotificationsService {
  private guestNotificationsCollection = firestore.collection(
    'guest_notifications',
  );

  async getAllGuestNotifications(): Promise<{ total: number; data: any[] }> {
    const snapshot = await this.guestNotificationsCollection.get();
    const guestNotifications = snapshot.docs.map((doc) => ({
      guestNotificationsId: doc.id,
      ...doc.data(),
    }));
    const total = guestNotifications.length;
    return { total: total, data: guestNotifications };
  }

  async getGuestNotificationsById(guestNotificationsId: string): Promise<any> {
    const guestNotificationsDoc = await this.guestNotificationsCollection
      .doc(guestNotificationsId)
      .get();
    if (!guestNotificationsDoc.exists) {
      return { message: 'Không tìm thấy Id' };
    }
    return guestNotificationsDoc.data();
  }

  async getGuestNotificationsByKeyType(keyType: string): Promise<any> {
    const guestNotificationsDoc = await this.guestNotificationsCollection
      .where('type', '==', keyType)
      .get();
    return {
      total: guestNotificationsDoc.docs.length,
      data: guestNotificationsDoc.docs.map((doc) => ({
        ...doc.data(),
      })),
    };
  }

  async createGuestNotifications(
    guestNotifications: GuestNotificationDto,
  ): Promise<GuestNotificationDto> {
    try {
      const validKeyTypes = [
        { keyType: 'all', nameType: 'Tổng hợp' },
        { keyType: 'scholarship', nameType: 'Học bổng' },
        { keyType: 'admission', nameType: 'Tuyển sinh' },
        { keyType: 'student', nameType: 'Sinh viên' },
        { keyType: 'teacher', nameType: 'Giảng viên' },
        { keyType: 'legal', nameType: 'Văn bản pháp quy' },
        { keyType: 'other', nameType: 'Khác' },
      ];

      const selectedKeyType = validKeyTypes.find(
        (item) => item.keyType === guestNotifications.type,
      );

      const guestNotificationsData = {
        name: guestNotifications.name,
        file: guestNotifications.file || null,
        dataPublished: Timestamp.now(),
        type: guestNotifications.type,
        nameType: selectedKeyType.nameType,
      };
      const docRef = await this.guestNotificationsCollection.add(
        guestNotificationsData,
      );
      const guestNotificationsId = docRef.id;
      await this.guestNotificationsCollection
        .doc(guestNotificationsId)
        .set({ guestNotificationsId: guestNotificationsId }, { merge: true });
      return {
        guestNotificationsId: guestNotificationsId,
        ...guestNotificationsData,
      } as GuestNotificationDto;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateGuestNotifications(
    guestNotificationsId: string,
    guestNotifications: GuestNotificationDto,
  ): Promise<any> {
    try {
      const validKeyTypes = [
        { keyType: 'all', nameType: 'Tổng hợp' },
        { keyType: 'scholarship', nameType: 'Học bổng' },
        { keyType: 'admission', nameType: 'Tuyển sinh' },
        { keyType: 'student', nameType: 'Sinh viên' },
        { keyType: 'teacher', nameType: 'Giảng viên' },
        { keyType: 'legal', nameType: 'Văn bản pháp quy' },
        { keyType: 'other', nameType: 'Khác' },
      ];

      const selectedKeyType = validKeyTypes.find(
        (item) => item.keyType === guestNotifications.type,
      );

      const guestNotificationsData = {
        name: guestNotifications.name,
        file: guestNotifications.file || null,
        dataPublished: Timestamp.now(),
        type: guestNotifications.type,
        nameType: selectedKeyType.nameType,
      };
      await this.guestNotificationsCollection
        .doc(guestNotificationsId)
        .set(guestNotificationsData, { merge: true });
      return {
        guestNotificationsId: guestNotificationsId,
        ...guestNotificationsData,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteGuestNotifications(guestNotificationsId: string): Promise<any> {
    try {
      await this.guestNotificationsCollection
        .doc(guestNotificationsId)
        .delete();
      return { message: 'Xóa thành công' };
    } catch (error) {
      throw new Error(error);
    }
  }
}
