import { Injectable } from '@nestjs/common';
import { firestore } from 'src/firebase.config';
import { MasterTraining } from 'src/master_training/dto/master_training.dto';

@Injectable()
export class MasterTrainingService {
  private masterTrainingCollection = firestore.collection('master_training');

  async getAllMasterTraining(): Promise<{ total: number; data: any[] }> {
    const snapshot = await this.masterTrainingCollection.get();
    const masterTraining = snapshot.docs.map((doc) => ({
      masterTrainingId: doc.id,
      ...doc.data(),
    }));
    const total = masterTraining.length;
    return { total: total, data: masterTraining };
  }

  async getMasterTrainingById(masterTrainingId: string): Promise<any> {
    const masterTrainingDoc = await this.masterTrainingCollection
      .doc(masterTrainingId)
      .get();
    if (!masterTrainingDoc.exists) {
      return { message: 'Không tìm thấy Id' };
    }
    return masterTrainingDoc.data();
  }

  async createMasterTraining(
    masterTraining: MasterTraining,
  ): Promise<MasterTraining> {
    try {
      const masterTrainingData = {
        name: masterTraining.name,
        file: masterTraining.file || null,
      };
      const docRef =
        await this.masterTrainingCollection.add(masterTrainingData);
      const masterTrainingId = docRef.id;
      await this.masterTrainingCollection
        .doc(masterTrainingId)
        .set({ masterTrainingId: masterTrainingId }, { merge: true });
      return {
        masterTrainingId: masterTrainingId,
        ...masterTrainingData,
      } as MasterTraining;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateMasterTraining(
    masterTrainingId: string,
    masterTraining: MasterTraining,
  ): Promise<any> {
    try {
      const masterTrainingData = {
        name: masterTraining.name,
        file: masterTraining.file || null,
      };
      await this.masterTrainingCollection
        .doc(masterTrainingId)
        .update(masterTrainingData);
      return { masterTrainingId, ...masterTrainingData };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteMasterTraining(masterTrainingId: string): Promise<any> {
    try {
      await this.masterTrainingCollection.doc(masterTrainingId).delete();
      return { message: 'Xóa thành công' };
    } catch (error) {
      throw new Error(error);
    }
  }
}
