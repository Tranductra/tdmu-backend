import { Injectable } from '@nestjs/common';
import { title } from 'process';
import { firestore } from 'src/firebase.config';
import { MessageNode } from 'src/message_node/dto/message_node.dto';
import { Timestamp } from '@google-cloud/firestore';
import * as nodemailer from 'nodemailer';
import * as mailgun from 'mailgun-js';

@Injectable()
export class MessageNodeService {
  private messageNodeCollection = firestore.collection('message_node');

  private mailgun: any;
  private domain: string =
    // 'sandbox8b040c0f9097484ea398a3cc0a2b39c8.mailgun.org'; // Địa chỉ domain bạn đã xác thực
    'tranductra2002@gmail.com'; // Địa chỉ domain bạn đã xác thực

  constructor() {
    this.mailgun = mailgun({
      apiKey: '267b94c9c68212aa8608d31935ba5543-72e4a3d5-15af714e', // Lấy API Key từ biến môi trường
      domain: this.domain,
    });
  }

  async getAllMessageNode(): Promise<{ total: number; data: any[] }> {
    const snapshot = await this.messageNodeCollection.get();
    const messageNodes = snapshot.docs.map((doc) => ({
      messageNodeId: doc.id,
      ...doc.data(),
    }));
    const total = messageNodes.length;
    return { total: total, data: messageNodes };
  }

  async getMessageNodeById(messageNodeId: string): Promise<any> {
    const messageNodeDoc = await this.messageNodeCollection
      .doc(messageNodeId)
      .get();
    if (!messageNodeDoc.exists) {
      return { message: 'Không tìm thấy Id' };
    }
    return messageNodeDoc.data();
  }

  async createMessageNode(messageNode: MessageNode): Promise<any> {
    try {
      const messageNodeData = {
        title: messageNode.title,
        content: messageNode.content,
        email: messageNode.email,
        phoneNumber: messageNode.phoneNumber,
        reply: messageNode.reply || null,
        dataPublished: Timestamp.now(),
      };

      const messageNodeRef =
        await this.messageNodeCollection.add(messageNodeData);
      await this.messageNodeCollection.doc(messageNodeRef.id).set(
        {
          messageNodeId: messageNodeRef.id,
        },
        { merge: true },
      );

      return { messageNodeId: messageNodeRef.id, ...messageNodeData };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateMessageNode(
    messageNodeId: string,
    updateMessageNodeDto: MessageNode,
  ): Promise<any> {
    try {
      const messageNodeRef = this.messageNodeCollection.doc(messageNodeId);
      if (!(await messageNodeRef.get()).exists) {
        throw new Error('Không tìm thấy Id');
      }

      const messageNodeData = {
        title: updateMessageNodeDto.title,
        content: updateMessageNodeDto.content,
        email: updateMessageNodeDto.email,
        phoneNumber: updateMessageNodeDto.phoneNumber,
        reply: updateMessageNodeDto.reply || null,
        dataPublished: Timestamp.now(),
      };
      await this.messageNodeCollection
        .doc(messageNodeId)
        .set(messageNodeData, { merge: true });

      return { messageNodeId: messageNodeId, ...updateMessageNodeDto };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteMessageNode(messageNodeId: string): Promise<any> {
    try {
      const messageNodeRef = this.messageNodeCollection.doc(messageNodeId);
      if (!(await messageNodeRef.get()).exists) {
        throw new Error('Không tìm thấy Id');
      }

      await messageNodeRef.delete();
      return { message: 'Xóa thành công' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async replyMessage(messageId: string, reply: string) {
    try {
      const messageDoc = await this.messageNodeCollection.doc(messageId).get();

      if (!messageDoc.exists) {
        return { message: 'Không tìm thấy Id' };
      }

      const messageData = messageDoc.data();

      // Thiết lập transporter Nodemailer với cấu hình SMTP
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'tranductra2002@gmail.com',
          pass: 'admx akan rrpw gqxz', // Lưu ý: không nên lưu pass trực tiếp trong code
        },
      });

      // Nội dung email
      const mailOptions = {
        from: 'tranductra2002@gmail.com',
        to: messageData?.email, // Gửi đến email người đã gửi tin nhắn
        subject: 'Phản hồi từ trường Đại Học Thủ Dầu Một', // Tiêu đề email
        text: reply, // Nội dung phản hồi từ admin
      };

      // Gửi email
      await transporter.sendMail(mailOptions);

      // Cập nhật trạng thái phản hồi trên database
      await this.messageNodeCollection.doc(messageId).set(
        {
          reply: reply,
          replyDate: Timestamp.now(),
        },
        { merge: true },
      );

      return { success: true, message: 'Phản hồi đã được gửi qua email và cập nhật trên hệ thống' };
    } catch (error) {
      throw new Error('Lỗi khi gửi phản hồi qua email: ' + error.message);
    }
  }
}
