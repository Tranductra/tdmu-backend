import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/dto/admin.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get()
    async getAll() {
        try {
            return await this.adminService.getAllAdmins();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } 


    @Get(':id')
    async getById(@Param('id') id: string) {
        try {
            return await this.adminService.getAdminById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Post()
    async create(@Body() admin: Admin) {
        try {
            return await this.adminService.createAdmin(admin);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAdminDto: Partial<Admin>,
    ) {
        try {
            return await this.adminService.updateAdmin(id, updateAdminDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            return await this.adminService.deleteAdmin(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

}
