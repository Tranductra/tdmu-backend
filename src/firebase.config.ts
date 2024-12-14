import * as admin from 'firebase-admin';
// import * as serviceAccount from '../config/serviceAccountKey.json'; // Đảm bảo đường dẫn đúng
import * as dotenv from 'dotenv';

// Đọc file .env
dotenv.config();

// Lấy giá trị từ biến môi trường SERVICE_ACCOUNT_KEY và phân tích nó thành một đối tượng JSON
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

// Kiểm Tra Nếu Thực Thể serviceAccount Đúng
if (!serviceAccount.project_id) {
  throw new Error('Service account JSON must contain a "project_id" property.');
}

// Khởi Tạo Firebase App
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://tdmu-book.firebaseio.com', // URL của Realtime Database nếu cần
  storageBucket: 'tdmu-book.appspot.com', // URL của Storage nếu cần
});

export const firestore = admin.firestore();
// export const storage = firebase.storage();
