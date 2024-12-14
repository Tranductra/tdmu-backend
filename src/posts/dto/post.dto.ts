import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsArray,
  IsOptional,
} from 'class-validator';

export class Post {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Mô tả của bài viết',
    example: 'Tin tức mới nhất',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Người đăng bài viết',
    example: 'A sample post',
  })
  uid: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Description of the post',
    example: 'A sample post',
  })
  username: string;

  @IsString()
  @ApiProperty({
    description: 'Description of the post',
    example: 'A sample post',
  })
  dataPublished: string;

  @IsString()
  @ApiProperty({
    description: 'Description of the post',
    example: 'A sample post',
  })
  postUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Description of the post',
    example: 'A sample post',
  })
  profImage: string;

  @IsArray()
  @ApiProperty({
    description: 'Likes of the post',
    example: [{ uid: '12345' }],
    required: false,
  })
  likes?: { uid: string }[];
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  uid?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  dataPublished?: string;

  @IsUrl()
  @IsOptional()
  postUrl?: string;

  @IsUrl()
  @IsOptional()
  profImage?: string;

  @IsArray()
  @IsOptional()
  likes?: { uid: string }[];

  constructor(partial: Partial<Post>) {
    Object.assign(this, partial);
  }
}
