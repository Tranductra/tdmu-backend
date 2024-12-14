import { Injectable } from '@nestjs/common';
import { firestore } from 'src/firebase.config';

@Injectable()
export class ContinuingEducationService {

    private continuingEducationCollection = firestore.collection('continuing_education');

    async getAllContinuingEducation(): Promise<{ total: number; data: any[] }> {
        const snapshot = await this.continuingEducationCollection.get();
        const continuingEducation = snapshot.docs.map((doc) => ({
            continuingEducationId: doc.id,
            ...doc.data(),
        }));
        const total = continuingEducation.length;
        return { total: total, data: continuingEducation };
    }

    async getContinuingEducationById(continuingEducationId: string): Promise<any> {
        const continuingEducationDoc = await this.continuingEducationCollection
            .doc(continuingEducationId)
            .get();
        if (!continuingEducationDoc.exists) {
            return { message: 'Không tìm thấy Id' };
        }
        return continuingEducationDoc.data();
    }


    async createContinuingEducation(continuingEducation: any): Promise<any> {
        try {
            const continuingEducationData = {
                name: continuingEducation.name,
                file: continuingEducation.file || null,
            };
            const docRef =
                await this.continuingEducationCollection.add(continuingEducationData);
            const continuingEducationId = docRef.id;
            await this.continuingEducationCollection
                .doc(continuingEducationId)
                .set({ continuingEducationId: continuingEducationId }, { merge: true });
            return {
                continuingEducationId: continuingEducationId,
                ...continuingEducationData,
            };
        } catch (error) {
            throw new Error(error);
        }
    }


    async updateContinuingEducation(continuingEducationId: string, continuingEducation: any): Promise<any> {
        try {
            const continuingEducationData = {
                name: continuingEducation.name,
                file: continuingEducation.file || null,
            };
            await this.continuingEducationCollection
                .doc(continuingEducationId)
                .set(continuingEducationData, { merge: true });
            return {
                continuingEducationId: continuingEducationId,
                ...continuingEducationData,
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteContinuingEducation(continuingEducationId: string): Promise<any> {
        try {
            await this.continuingEducationCollection.doc(continuingEducationId).delete();
            return { message: 'Xóa thành công' };
        } catch (error) {
            throw new Error(error);
        }
    }
    
}
