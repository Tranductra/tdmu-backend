import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MasterTraining } from 'src/master_training/dto/master_training.dto';
import { MasterTrainingService } from 'src/master_training/master_training.service';

@ApiTags('Master Training')
@Controller('master-training')
export class MasterTrainingController {
    constructor(private readonly masterTrainingService: MasterTrainingService) {}


    @Get()
    async getAll() {
        try {
            return await this.masterTrainingService.getAllMasterTraining();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        try {
            return await this.masterTrainingService.getMasterTrainingById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Post()
    async create(@Body() masterTraining: MasterTraining) {
        try {
            return await this.masterTrainingService.createMasterTraining(masterTraining);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateMasterTrainingDto: MasterTraining) {
        try {
            return await this.masterTrainingService.updateMasterTraining(id, updateMasterTrainingDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            return await this.masterTrainingService.deleteMasterTraining(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
