import { GeneralInfomation } from './dto/general_infomation.dto';
import { Injectable } from '@nestjs/common';
import { firestore } from 'src/firebase.config';

@Injectable()
export class GeneralInfomationsService {
  private generalInfomationCollection = firestore.collection(
    'general_infomations',
  );

  async getAllGeneralInfomations(): Promise<{
    total: number;
    generalInfomations: any[];
  }> {
    const snapshot = await this.generalInfomationCollection.get();
    const generalInfomations = snapshot.docs.map((doc) => ({
      generalInfomationId: doc.id,
      ...doc.data(),
    }));
    const total = generalInfomations.length;
    return { total, generalInfomations };
  }

  async getGeneralInfomationById(
    generalInfomationId: string,
  ): Promise<{ message: string } | any> {
    const generalInfomationDoc = await this.generalInfomationCollection
      .doc(generalInfomationId)
      .get();
    if (!generalInfomationDoc.exists) {
      return { message: 'Không tìm thấy Id' };
    }
    return generalInfomationDoc.data() as GeneralInfomation;
  }

  async getGeneralInfomationByKeyType(
    keyType: string,
  ): Promise<{ total: number; data: any[] }> {
    const generalInfomationDoc = await this.generalInfomationCollection
      .where('keyType', '==', keyType)
      .get();

    return {
      total: generalInfomationDoc.docs.length,
      data: generalInfomationDoc.docs.map((doc) => ({
        ...doc.data(),
      })),
    };
  }

  async createGeneralInfomation(
    generalInfomation: GeneralInfomation,
  ): Promise<GeneralInfomation> {
    const validKeyTypes = [
      { keyType: 'name_school', nameType: 'Tên trường' },
      { keyType: 'development_strategy', nameType: 'Chiến lược phát triển' },
      { keyType: 'core_values', nameType: 'Giá trị cốt lõi' },
      { keyType: 'educational_philosophy', nameType: 'Triết lý giáo dục' },
      { keyType: 'history_summary', nameType: 'Khái quát lịch sử phát triển' },
      {
        keyType: 'quality_assurance_ranking',
        nameType: 'Kiểm định chất lượng và xếp hạng đại học',
      },
      // Thêm các keyType và nameType khác nếu cần
    ];

    try {
      const selectedKeyType = validKeyTypes.find(
        (item) => item.keyType === generalInfomation.keyType,
      );

      if (!selectedKeyType) {
        throw new Error('Mã keyType không đúng.');
      }

      const data = {
        title: generalInfomation.title,
        description: generalInfomation.description,
        keyType: generalInfomation.keyType,
        nameType: selectedKeyType.nameType, // Thêm nameType vào dữ liệu
      };

      const newGeneralInfomationRef =
        await this.generalInfomationCollection.add(data);

      const generalInfomationId = newGeneralInfomationRef.id;
      await this.generalInfomationCollection.doc(generalInfomationId).set(
        {
          generalInfoId: generalInfomationId,
        },
        { merge: true },
      );

      return {
        ...generalInfomation,
        nameType: selectedKeyType.nameType,
        generalInfoId: generalInfomationId,
      } as GeneralInfomation;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateGeneralInfomation(
    generalInfoId: string,
    generalInfomation: GeneralInfomation,
  ): Promise<GeneralInfomation> {
    try {
      const generalInfomationRef =
        this.generalInfomationCollection.doc(generalInfoId);
      const generalInfomationSnapshot = await generalInfomationRef.get();

      if (!generalInfomationSnapshot.exists) {
        throw new Error('Không tìm thấy Id');
      }

      const validKeyTypes = [
        { keyType: 'name_school', nameType: 'Tên trường' },
        { keyType: 'development_strategy', nameType: 'Chiến lược phát triển' },
        { keyType: 'core_values', nameType: 'Giá trị cốt lõi' },
        { keyType: 'educational_philosophy', nameType: 'Triết lý giáo dục' },
        {
          keyType: 'history_summary',
          nameType: 'Khái quát lịch sử phát triển',
        },
        {
          keyType: 'quality_assurance_ranking',
          nameType: 'Kiểm định chất lượng và xếp hạng đại học',
        },
        // Thêm các keyType và nameType khác nếu cần
      ];
      const selectedKeyType = validKeyTypes.find(
        (item) => item.keyType === generalInfomation.keyType,
      );

      if (!selectedKeyType) {
        throw new Error('Mã keyType không đúng.');
      }

      const data = {
        title: generalInfomation.title,
        description: generalInfomation.description,
        keyType: generalInfomation.keyType,
        nameType: selectedKeyType.nameType, // Thêm nameType vào dữ liệu
      };
      await this.generalInfomationCollection.doc(generalInfoId).update(data);

      return { generalInfoId: generalInfoId, ...data } as GeneralInfomation;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteGeneralInfomation(
    generalInfomationId: string,
  ): Promise<{ message: string }> {
    try {
      const generalInfomationRef =
        this.generalInfomationCollection.doc(generalInfomationId);
      const generalInfomationSnapshot = await generalInfomationRef.get();

      if (!generalInfomationSnapshot.exists) {
        throw new Error('Không tìm thấy Id');
      }

      await this.generalInfomationCollection.doc(generalInfomationId).delete();
      return { message: 'Xóa thành công' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
