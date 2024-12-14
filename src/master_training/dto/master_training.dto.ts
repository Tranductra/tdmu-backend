import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class MasterTraining {
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
}
