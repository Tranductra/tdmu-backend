import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ContinuingEducation {
  @ApiProperty({
    description: 'Tên chương trình đào tạo',
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
