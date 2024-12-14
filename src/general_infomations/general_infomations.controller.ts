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
import { ApiTags } from '@nestjs/swagger';
import { GeneralInfomation } from 'src/general_infomations/dto/general_infomation.dto';
import { GeneralInfomationsService } from 'src/general_infomations/general_infomations.service';

@ApiTags('GeneralInfomations')
@Controller('general-infomations')
export class GeneralInfomationsController {
  constructor(
    private readonly generalInfomationsService: GeneralInfomationsService,
  ) {}

  @Get()
  async getAll() {
    try {
      return await this.generalInfomationsService.getAllGeneralInfomations();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.generalInfomationsService.getGeneralInfomationById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('key/:keyType')
  async getByKeyType(@Param('keyType') keyType: string) {
    try {
      return await this.generalInfomationsService.getGeneralInfomationByKeyType(
        keyType,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // @Post()
  @Post()
  async create(@Body() generalInfomation: GeneralInfomation) {
    try {
      return await this.generalInfomationsService.createGeneralInfomation(
        generalInfomation,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGeneralInfomationDto: GeneralInfomation) {
    try {
      return await this.generalInfomationsService.updateGeneralInfomation(
        id,
        updateGeneralInfomationDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.generalInfomationsService.deleteGeneralInfomation(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
