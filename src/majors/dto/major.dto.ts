import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Industry } from 'src/industrys/dto/industry.dto';

export class Major {
  @ApiProperty({
    description: 'Tên ngành',
    example: 'Kỹ thuật phần mềm',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Tổng sô tín chỉ',
    example: '150',
  })
  @IsOptional()
  @IsString()
  totalCalculationOnly?: string;

  @ApiProperty({
    description: 'Danh hiệu',
    example: 'Kỹ sư',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Thời gian đào tạo',
    example: '4.5 năm',
  })
  @IsString()
  @IsOptional()
  trainingTime?: string;

  @ApiProperty({
    description: 'Mã khối ngành',
    example: '5TApMZ2mXPVMRd9POtA4',
  })
  @IsString()
  industryId?: string;

  @ApiProperty({
    description: 'Đạt chuẩn AUN-QA hay không',
    example: false,
  })
  @IsOptional()
  aun_qa?: boolean;

  @ApiProperty({
    description: 'Link ảnh đại diện của ngành',
    example: [
      'https://example.com/avatar.jpg',
      'https://example.com/avatar2.jpg',
    ],
  })
  @IsOptional()
  images?: [];

  @ApiProperty({
    description: 'File',
    example: 'string',
  })
  @IsOptional()
  file?: string;
}
