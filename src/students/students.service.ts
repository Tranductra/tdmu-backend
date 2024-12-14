import { BadRequestException, Injectable } from '@nestjs/common';
import { firestore } from 'src/firebase.config';
import { Student } from 'src/students/dto/student.dto';

@Injectable()
export class StudentsService {
  private studentCollection = firestore.collection('students');
  private classCollection = firestore.collection('classes');

  async getAllStudents(): Promise<{ total: number; students: any[] }> {
    const snapshot = await this.studentCollection.get();
    const students = snapshot.docs.map((doc) => ({
      studentId: doc.id,
      ...doc.data(),
    }));
    const total = students.length; // Total count of students
    return { total, students };
  }

  async getStudentById(
    studentId: string,
  ): Promise<Student | { message: string }> {
    const studentDoc = await this.studentCollection.doc(studentId).get();
    if (!studentDoc.exists) {
      return { message: 'Không tìm thấy Id' };
    }
    return studentDoc.data() as Student;
  }

  // get student by classId
  async getStudentByClassId(classId: string): Promise<{total:number , students: any[]}> {
    const snapshot = await this.studentCollection.where('class.classId', '==', classId).get();
    const students = snapshot.docs.map((doc) => ({
      studentId: doc.id,
      ...doc.data(),
    }));
    const total = students.length; // Total count of students
    return { total, students };
  }

  // async createStudent(student: Student): Promise<Student> {
  //   try {
  //     let classData = null;

  //     // If classId exists, get class data from Firestore
  //     if (student.classId) {
  //       const classRef = firestore.collection('classes').doc(student.classId);
  //       const classSnapshot = await classRef.get();

  //       // Check if class exists
  //       if (!classSnapshot.exists) {
  //         throw new Error('Mã lớp không tồn tại');
  //       }

  //       classData = classSnapshot.data();
  //     }

  //     // Check if email already exists in Firestore collection 'students'
  //     const emailSnapshot = await this.studentCollection
  //       .where('email', '==', student.email)
  //       .get();
  //     if (!emailSnapshot.empty) {
  //       throw new Error('Email đã tồn tại');
  //     }

  //     // Check if phone already exists in Firestore collection 'students'
  //     const phoneSnapshot = await this.studentCollection
  //       .where('phone', '==', student.phone)
  //       .get();

  //     if (!phoneSnapshot.empty) {
  //       throw new Error('Số điện thoại đã tồn tại');
  //     }
  //     const studentData = {
  //       name: student.name,
  //       email: student.email,
  //       phone: student.phone,
  //       codePhone: student.codePhone,
  //       class: classData,
  //       photoUrl: student.photoUrl,
  //     };

  //     // Save plain object to Firestore
  //     const newStudentRef = await this.studentCollection.add(studentData);
  //     const studentId = newStudentRef.id;
  //     await this.studentCollection
  //       .doc(studentId)
  //       .set({ studentId: studentId }, { merge: true });

  //     return { ...studentData, studentId: studentId } as Student;
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }
  // Create a new student
  async createStudent(student: Student): Promise<Student> {
    try {
      // Kiểm tra dữ liệu đầu vào
      await this.validateStudentData(student);

      // Chuẩn bị dữ liệu sinh viên để lưu
      const studentData = await this.prepareStudentData(student);

      // Lưu dữ liệu sinh viên vào Firestore
      const newStudentRef = await this.studentCollection.add(studentData);
      const studentId = newStudentRef.id;

      // Cập nhật studentId vào tài liệu vừa tạo
      await this.studentCollection
        .doc(studentId)
        .set({ studentId: studentId }, { merge: true });

      return { ...studentData, studentId: studentId } as Student;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateStudent(
    id: string,
    updatedData: Partial<Student>,
  ): Promise<Student> {
    try {
      const studentRef = this.studentCollection.doc(id);
      const studentSnapshot = await studentRef.get();

      if (!studentSnapshot.exists) {
        throw new Error('Không tìm thấy Id');
      }

      const classRef = firestore.collection('classes').doc(updatedData.classId);
      const classSnapshot = await classRef.get();
      if (!classSnapshot.exists) {
        throw new Error('Mã lớp không tồn tại');
      }

      await studentRef.update(updatedData);
      return { id, ...updatedData } as Student;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteStudent(id: string): Promise<{ message: string }> {
    try {
      const studentRef = this.studentCollection.doc(id);
      const studentSnapshot = await studentRef.get();

      if (!studentSnapshot.exists) {
        throw new Error('Không tìm thấy Id');
      }

      await studentRef.delete();
      return { message: 'Xóa thành công' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Helper Methods

  // Validate student data before creation
  private async validateStudentData(student: Student): Promise<void> {
    // Kiểm tra classId nếu có
    if (student.classId) {
      await this.checkClassExists(student.classId);
    }

    // Kiểm tra tính duy nhất của email
    await this.checkEmailUnique(student.email);

    // Kiểm tra tính duy nhất của phone
    await this.checkPhoneUnique(student.phone);
  }

  // Check if class exists
  private async checkClassExists(classId: string): Promise<void> {
    const classDoc = await this.classCollection.doc(classId).get();
    if (!classDoc.exists) {
      throw new BadRequestException('Mã lớp không tồn tại');
    }
  }

  // Check if email is unique
  private async checkEmailUnique(
    email: string,
    currentStudentId?: string,
  ): Promise<void> {
    const emailSnapshot = await this.studentCollection
      .where('email', '==', email)
      .get();
    if (!emailSnapshot.empty) {
      const existingStudent = emailSnapshot.docs.find(
        (doc) => doc.id !== currentStudentId,
      );
      if (existingStudent) {
        throw new BadRequestException('Email đã tồn tại');
      }
    }
  }

  // Check if phone is unique
  private async checkPhoneUnique(
    phone: string,
    currentStudentId?: string,
  ): Promise<void> {
    const phoneSnapshot = await this.studentCollection
      .where('phone', '==', phone)
      .get();
    if (!phoneSnapshot.empty) {
      const existingStudent = phoneSnapshot.docs.find(
        (doc) => doc.id !== currentStudentId,
      );
      if (existingStudent) {
        throw new BadRequestException('Số điện thoại đã tồn tại');
      }
    }
  }

  // Prepare student data before saving to Firestore
  private async prepareStudentData(student: Student): Promise<any> {
    const { name, email, phone, codePhone, classId, photoUrl } = student;

    let classData = null;

    // Kiểm tra nếu có classId, thì truy vấn Firestore để lấy toàn bộ dữ liệu của lớp
    if (classId) {
      const classRef = firestore.collection('classes').doc(classId);
      const classSnapshot = await classRef.get();

      if (classSnapshot.exists) {
        classData = classSnapshot.data(); // Lấy toàn bộ dữ liệu của lớp
      } else {
        throw new Error('Mã lớp không tồn tại');
      }
    }

    // Trả về dữ liệu sinh viên kèm thông tin đầy đủ của lớp
    return {
      name,
      email,
      phone,
      codePhone,
      class: classData, // Thông tin đầy đủ của lớp học
      photoUrl : photoUrl || null,
    };
  }


  async changeCodePhone(studentId: string, codePhone: string): Promise<Student> {
    try {
      const teacherRef = this.studentCollection.doc(studentId);
      const teacherSnapshot = await teacherRef.get();
      if (!teacherSnapshot.exists) {
        throw new Error('Không tìm thấy Id');
      }

      await teacherRef.set({ codePhone }, { merge: true });
      return { ...teacherSnapshot.data(), codePhone } as Student;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
