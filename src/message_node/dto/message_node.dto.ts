import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class MessageNode {
  @ApiProperty({
    description: 'Message Node Title',
    example: 'Trung cấp liên thông đại học',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Message Node Content',
    example: 'string',
  })
  @IsString()
  content?: string;

  @ApiProperty({
    description: 'Message Node Phone Number',
    example: 'string',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: 'Message Node Email',
    example: 'string',
  })
  @IsString()
  email: string;


  @ApiProperty({
    description: 'Message Node Email',
    example: 'string',
  })
  @IsOptional()
  reply?: string;
}
