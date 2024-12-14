import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các thuộc tính không có trong DTO
      forbidNonWhitelisted: true, // Ném lỗi nếu có thuộc tính không hợp lệ
      transform: true, // Tự động chuyển đổi các kiểu dữ liệu đầu vào
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('TDMu Book API')
    .setDescription('The TDMu Book API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors(); // Bật CORS cho tất cả các nguồn
  // Cấu hình CORS
  // app.enableCors({
  //   origin: 'http://localhost:3000', // Nguồn cho phép
  //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Các phương thức HTTP được phép
  //   allowedHeaders: ['Content-Type', 'Authorization'], // Các header được phép
  // });

  await app.listen(3003);
}
bootstrap();
