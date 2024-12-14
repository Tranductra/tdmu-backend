import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Teacher } from 'src/teacher/dto/teacher.dto';
import { TeacherService } from 'src/teacher/teacher.service';

@ApiTags('Teachers')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  async getAll() {
    try {
      return await this.teacherService.getAllTeachers();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.teacherService.getTeacherById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() teacher: Teacher) {
    try {
      return await this.teacherService.createTeacher(teacher);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: Partial<Teacher>,
  ) {
    try {
      return await this.teacherService.updateTeacher(id, updateTeacherDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.teacherService.deleteTeacher(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        codePhone: { type: 'string', example: '221102' }, // Mẫu JSON
      },
    },
  })

  @Put(':id/change-code-phone')
  async changeCodePhone(
    @Param('id') id: string,
    @Body('codePhone') codePhone: string,
  ) {
    try {
      return await this.teacherService.changeCodePhone(id, codePhone);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
