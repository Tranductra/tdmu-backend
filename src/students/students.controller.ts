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
import { Student } from 'src/students/dto/student.dto';
import { StudentsService } from 'src/students/students.service';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async getAll() {
    try {
      return await this.studentsService.getAllStudents();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.studentsService.getStudentById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('class/:classId')
  async getByClassId(@Param('classId') classId: string) {
    try {
      return await this.studentsService.getStudentByClassId(classId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() student: Student) {
    try {
      return await this.studentsService.createStudent(student);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: Partial<Student>,
  ) {
    try {
      return await this.studentsService.updateStudent(id, updateStudentDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.studentsService.deleteStudent(id);
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
      return await this.studentsService.changeCodePhone(id, codePhone);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
