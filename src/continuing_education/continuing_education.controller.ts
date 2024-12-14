import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContinuingEducationService } from 'src/continuing_education/continuing_education.service';
import { ContinuingEducation } from 'src/continuing_education/dto/continuing_education.dto';

@ApiTags('Continuing Education')
@Controller('continuing-education')
export class ContinuingEducationController {

    constructor(private readonly continuingEducationService: ContinuingEducationService) {}

    @Get()
    async getAll() {
        try {
            return await this.continuingEducationService.getAllContinuingEducation();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get(':id')
    async getById(@Param('id') id: string) {
        try {
            return await this.continuingEducationService.getContinuingEducationById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Post()
    async create(@Body() continuingEducation: ContinuingEducation) {
        try {
            return await this.continuingEducationService.createContinuingEducation(continuingEducation);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateContinuingEducationDto: ContinuingEducation) {
        try {
            return await this.continuingEducationService.updateContinuingEducation(id, updateContinuingEducationDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            return await this.continuingEducationService.deleteContinuingEducation(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
