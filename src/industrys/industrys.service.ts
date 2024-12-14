import { Injectable } from '@nestjs/common';
import { firestore } from 'src/firebase.config';
import { Industry } from 'src/industrys/dto/industry.dto';

@Injectable()
export class IndustrysService {
  private industryCollection = firestore.collection('industrys');

  async getAllIndustrys(): Promise<{ total: number; data: any[] }> {
    const snapshot = await this.industryCollection.get();
    const industrys = snapshot.docs.map((doc) => ({
      industryId: doc.id,
      ...doc.data(),
    }));
    const total = industrys.length; // Total count of industrys
    return { total, data: industrys };
  }

  async getIndustryById(
    industryId: string,
  ): Promise<{ total: number; data: any[] }> {
    const industryDoc = await this.industryCollection.doc(industryId).get();
    if (!industryDoc.exists) {
      return { total: 0, data: [] };
    }
    return { total: 1, data: [industryDoc.data()] };
  }

  async createIndustry(industry: Industry): Promise<Industry> {
    try {
      const data = {
        name: industry.name,
        photoUrl: industry.photoUrl ?? null,
      };
      const newIndustryRef = await this.industryCollection.add(data);
      const industryId = newIndustryRef.id;
      await this.industryCollection
        .doc(industryId)
        .set({ industryId: industryId }, { merge: true });

      return { ...industry, industryId: industryId } as Industry;
    } catch (error) {
      return error;
    }
  }

  async updateIndustry(
    industryId: string,
    industry: Partial<Industry>,
  ): Promise<Industry> {
    try {
      const industryRef = this.industryCollection.doc(industryId);
      const snapshot = await industryRef.get();
      if (!snapshot.exists) {
        throw new Error('Không tìm thấy khối ngành');
      }

      await industryRef.update(industry);

      return { ...industry, industryId: industryId } as Industry;
    } catch (error) {
      return error;
    }
  }

    async deleteIndustry(industryId: string): Promise<{ message: string }> {
        try {
        const industryRef = this.industryCollection.doc(industryId);
        const snapshot = await industryRef.get();
        if (!snapshot.exists) {
            throw new Error('Không tìm thấy khối ngành');
        }
    
        await industryRef.delete();
    
        return { message: 'Xóa khối ngành thành công' };
        } catch (error) {
        return error;
        }
    }
}
