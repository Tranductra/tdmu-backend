import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Tuition } from 'src/tuition/dto/tuition.dto';
import { TuitionService } from 'src/tuition/tuition.service';

@Controller('tuition')
export class TuitionController {
    constructor(private readonly tuitionService: TuitionService) {}

    @Get()
    async getAll() {
        try {
            return await this.tuitionService.getAllTuition();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        try {
            return await this.tuitionService.getTuitionById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Post()
    async create(@Body() tuition: Tuition) {
        try {
            return await this.tuitionService.createTuition(tuition);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTuitionDto: Tuition) {
        try {
            return await this.tuitionService.updateTuition(id, updateTuitionDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            return await this.tuitionService.deleteTuition(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    
}
