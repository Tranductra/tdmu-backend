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
import { Industry } from 'src/industrys/dto/industry.dto';
import { IndustrysService } from 'src/industrys/industrys.service';

@ApiTags('Industrys')
@Controller('industrys')
export class IndustrysController {
  constructor(private readonly industrysService: IndustrysService) {}

  @Get()
  async getAll() {
    try {
      return await this.industrysService.getAllIndustrys();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getById(id: string) {
    try {
      return await this.industrysService.getIndustryById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() industry: Industry) {
    try {
      return await this.industrysService.createIndustry(industry);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(id: string, industry: Partial<Industry>) {
    try {
      return await this.industrysService.updateIndustry(id, industry);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.industrysService.deleteIndustry(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
