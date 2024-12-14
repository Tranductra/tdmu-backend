import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Teacher {
  @ApiProperty({
    description: 'Tên của giảng viên',
    example: 'Nguyễn Văn A',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email của giảng viên',
    example: 'tranductra2002@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Số điện thoại của giảng viên',
    example: '0931269870',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Mã đăng nhập của giảng viên',
    example: '221102',
  })
  @IsOptional()
  codePhone?: string;

  @ApiProperty({
    description: 'Mã lớp làm cố vấn của giảng viên',
    example: ['Yk7W42LraBP9JDAknLlH', 'VbbxnIa6VYtYKmvNNs3w'],
  })
  @IsOptional()
  classId?: [];

  @IsOptional()
  @ApiProperty({
    description: 'Link ảnh đại diện của sinh viên',
    example: 'https://example.com/avatar.jpg',
  })
  photoUrl?: string;
}


