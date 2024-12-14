import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Student {
  @ApiProperty({
    description: 'Tên của sinh viên',
    example: 'Sinh viên 1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email của sinh viên',
    example: '2024801030001@student.tdmu.edu.vn',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Số điện thoại của sinh viên',
    example: '0931269870',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Mã đăng nhập của sinh viên',
    example: '221102',
  })
  @IsOptional()
  codePhone?: string;

  @ApiProperty({
    description: 'Mã lớp của sinh viên',
    example: 'Yk7W42LraBP9JDAknLlH',
  })
  @IsOptional()
  classId?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Link ảnh đại diện của sinh viên',
    example: 'https://example.com/avatar.jpg',
  })
  photoUrl?: string;
}
