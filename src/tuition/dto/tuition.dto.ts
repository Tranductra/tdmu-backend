import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class Tuition {
  @ApiProperty({
    description: 'Tên nội dung học phí',
    example: 'Trung cấp liên thông đại học',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'File',
    example: 'string',
  })
  @IsOptional()
  file?: string;
}
