import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsUrl,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class Unit {
  @IsString({ message: 'Tên đơn vị phải là chuỗi string' })
  @IsNotEmpty({ message: 'Tên đơn vị không được để trống' })
  @ApiProperty({
    description: 'Tên đơn vị',
    example: 'Khoa Công Nghệ Thông Tin',
  })
  name: string;

  @IsString({ message: 'Số điện thoại phải là chuỗi string' })
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @ApiProperty({
    description: 'Số điện thoại của đơn vị',
    example: '0931269870',
  })
  phone: string;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsString({ message: 'Email phải là chuỗi string' })
  @ApiProperty({
    description: 'Email của đơn vị',
    example: 'vienCNTT@unit.com',
    required: false,
  })
  email: string;

  @ApiProperty({
    description: 'Website của đơn vị',
    example: 'cntt.edu.vn',
    required: false,
  })
  @IsOptional()
  website?: string;

  @ApiProperty({
    description: 'Facebook của đơn vị',
    example: 'https://facebook.com/cntt',
    required: false,
  })
  @IsOptional()
  facebook?: string;

  @ApiProperty({
    description: 'YouTube của đơn vị',
    example: 'https://youtube.com/cntt',
    required: false,
  })
  @IsOptional()
  youtube?: string;

  @IsString({ message: 'Từ khóa phải là chuỗi string' })
  @IsNotEmpty({ message: 'Từ khóa không được để trống' })
  @ApiProperty({
    description: 'Từ khóa của đơn vị',
    example: 'TDMU_CNTT',
    required: false,
  })
  keyword?: string;
}

