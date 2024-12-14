import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Admin {
  @ApiProperty({
    description: 'Email của admin',
    example: 'vien@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Số điện thoại của admin',
    example: '0911111111',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Tên của admin',
    example: 'Công tác trường',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Mật khẩu của admin',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  codePhone: string;

  @ApiProperty({
    description: 'Link ảnh đại diện của admin',
    example: 'https://example.com/avatar.jpg',
  })
  @IsString()
  @IsNotEmpty()
  photoUrl: string;
}
