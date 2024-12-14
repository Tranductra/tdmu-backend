import { Injectable } from '@nestjs/common';
import { firestore } from 'src/firebase.config';
import { Industry } from 'src/industrys/dto/industry.dto';
import { Major } from 'src/majors/dto/major.dto';

@Injectable()
export class MajorsService {
  private majorCollection = firestore.collection('majors');

  async getAllMajors(): Promise<{ total: number; data: any[] }> {
    const snapshot = await this.majorCollection.get();
    const majors = snapshot.docs.map((doc) => ({
      majorId: doc.id,
      ...doc.data(),
    }));
    const total = majors.length;
    return { total: total, data: majors };
  }

  async getMajorById(majorId: string): Promise<any> {
    const majorDoc = await this.majorCollection.doc(majorId).get();
    if (!majorDoc.exists) {
      return { message: 'Không tìm thấy Id' };
    }
    return majorDoc.data();
  }

  async getMajorByIndustryId(
    industryId: string,
  ): Promise<{ total: number; data: any[] }> {
    const majorDocs = await this.majorCollection
      .where('industry.industryId', '==', industryId)
      .get();
    const majors = majorDocs.docs.map((doc) => ({
      majorId: doc.id,
      ...doc.data(),
    }));
    const total = majors.length;
    return { total, data: majors };
  }

  async createMajor(major: Major): Promise<Major> {
    try {
      let industry = null;

      if (major.industryId) {
        const industryRef = firestore
          .collection('industrys')
          .doc(major.industryId);
        const industrySnapshot = await industryRef.get();

        if (!industrySnapshot.exists) {
          throw new Error('Mã ngành không tồn tại');
        }

        industry = industrySnapshot.data() as Industry;
      }

      const majorData = {
        name: major.name,
        industry: industry,
        images: major.images ?? null,
        totalCalculationOnly: major.totalCalculationOnly ?? null,
        title: major.title ?? null,
        aun_qa: major.aun_qa ?? false,
        trainingTime: major.trainingTime ?? null,
        file: major.file || null,
      };

      const majorRef = await this.majorCollection.add(majorData);
      const majorId = majorRef.id;

      await this.majorCollection
        .doc(majorId)
        .set({ majorId: majorId }, { merge: true });

      return { majorId: majorId, ...majorData } as Major;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateMajor(majorId: string, major: Major): Promise<Major> {
    try {
      const majorRef = await this.majorCollection.doc(majorId).get();
      if (!majorRef.exists) {
        throw new Error('Mã ngành không tồn tại');
      }

      let industry = null;
      if (major.industryId) {
        const industryRef = firestore
          .collection('industrys')
          .doc(major.industryId);
        const industrySnapshot = await industryRef.get();

        if (!industrySnapshot.exists) {
          throw new Error('Mã khối ngành không tồn tại');
        }

        industry = industrySnapshot.data() as Industry;
      }

      const majorData = {
        name: major.name,
        industry: industry,
        images: major.images ?? null,
        totalCalculationOnly: major.totalCalculationOnly ?? null,
        title: major.title ?? null,
        aun_qa: major.aun_qa ?? false,
        trainingTime: major.trainingTime ?? null,
        file: major.file || null,
      };

      await this.majorCollection.doc(majorId).set(majorData, { merge: true });

      return { majorId: majorId, ...majorData } as Major;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteMajor(majorId: string): Promise<{ message: string }> {
    try {
      const majorRef = this.majorCollection.doc(majorId);
      const majorSnapshot = await majorRef.get();

      if (!majorSnapshot.exists) {
        throw new Error('Không tìm thấy Id');
      }

      await majorRef.delete();
      return { message: 'Xóa thành công' };
    } catch (error) {
      throw new Error(error);
    }
  }
}
