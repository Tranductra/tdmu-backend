import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GeneralInfomation {
    @ApiProperty({
        description: 'Tên tiêu đề',
        example: 'Tên trường',
    })
    @IsString()
    title : string;

    @ApiProperty({
        description: 'Mô tả',
        example: 'Trường Đại học Y Dược Thái Nguyên',
    })
    @IsString()
    description : string;


    @ApiProperty({
        description: 'Key',
        example: 'name_school',
    })
    @IsString()
    keyType : string;
}