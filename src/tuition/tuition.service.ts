import { Injectable } from '@nestjs/common';
import { firestore } from 'src/firebase.config';

@Injectable()
export class TuitionService {
    private tuitionCollection = firestore.collection('tuition');

    async getAllTuition(): Promise<{ total: number; data: any[] }> {
        const snapshot = await this.tuitionCollection.get();
        const tuition = snapshot.docs.map((doc) => ({
            tuitionId: doc.id,
            ...doc.data(),
        }));
        const total = tuition.length;
        return { total: total, data: tuition };
    }

    async getTuitionById(tuitionId: string): Promise<any> {
        const tuitionDoc = await this.tuitionCollection.doc(tuitionId).get();
        if (!tuitionDoc.exists) {
            return { message: 'Không tìm thấy Id' };
        }
        return tuitionDoc.data();
    }

    async createTuition(tuition: any): Promise<any> {
        try {
            const tuitionData = {
                name: tuition.name,
                file: tuition.file || null,
            };
            const docRef = await this.tuitionCollection.add(tuitionData);
            const tuitionId = docRef.id;
            await this.tuitionCollection.doc(tuitionId).set({ tuitionId: tuitionId }, { merge: true });
            return {
                tuitionId: tuitionId,
                ...tuitionData,
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateTuition(tuitionId: string, tuition: any): Promise<any> {
        try {
            const tuitionData = {
                name: tuition.name,
                file: tuition.file || null,
            };
            await this.tuitionCollection.doc(tuitionId).set(tuitionData, { merge: true });
            return {
                tuitionId: tuitionId,
                ...tuitionData,
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteTuition(tuitionId: string): Promise<any> {
        try {
            await this.tuitionCollection.doc(tuitionId).delete();
            return { message: 'Xóa thành công' };
        } catch (error) {
            throw new Error(error);
        }
    }

    
}
