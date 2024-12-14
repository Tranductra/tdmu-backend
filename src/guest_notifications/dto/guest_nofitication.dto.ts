import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GuestNotificationDto {
  @ApiProperty({
    description: 'Tên ngành',
    example: 'Kỹ thuật phần mềm',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'File',
    example: 'string',
  })
  @IsOptional()
  file?: string;


  @ApiProperty({
    description: 'Loại',
    example: 'string',
  })
  @IsOptional()
  type: string;
}
