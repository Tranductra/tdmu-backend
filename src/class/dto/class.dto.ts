import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Unit } from 'src/units/dto/unit.dto';

export class Class {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tên lớp',
    example: 'KTPM1',
  })
  name: string;

  

  @IsOptional()
  @ApiProperty({
    description: 'Mã khoa',
    example: '6BfWsv3nuffvOQVqZsSV',
  })
  unitId?: string;

  @Optional()
  unit: Unit;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Số điện thoại của lớp',
    example: '0931269870',
  })
  phone: string;
}
