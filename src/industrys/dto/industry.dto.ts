import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Industry {
  @ApiProperty({
    description: 'Tên ngành',
    example: 'Khối ngành công nghệ thông tin',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Link ảnh đại diện của ngành',
    type: 'string',
  })
  @IsOptional()
  photoUrl?: string;
}
