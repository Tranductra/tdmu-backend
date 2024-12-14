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
import { GuestNotificationDto } from 'src/guest_notifications/dto/guest_nofitication.dto';
import { GuestNotificationsService } from 'src/guest_notifications/guest_notifications.service';

@ApiTags('Guest Notifications')
@Controller('guest-notifications')
export class GuestNotificationsController {
  constructor(
    private readonly guestNotificationsService: GuestNotificationsService,
  ) {}

  @Get()
  async getAll() {
    try {
      return await this.guestNotificationsService.getAllGuestNotifications();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.guestNotificationsService.getGuestNotificationsById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

    @Get('type/:type')
    async getByType(@Param('type') type: string) {
        try {
            return await this.guestNotificationsService.getGuestNotificationsByKeyType(
            type,
            );
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        }

  @Post()
  async create(@Body() guestNotifications: GuestNotificationDto) {
    try {
      return await this.guestNotificationsService.createGuestNotifications(
        guestNotifications,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGuestNotificationDto: GuestNotificationDto,
  ) {
    try {
      return await this.guestNotificationsService.updateGuestNotifications(
        id,
        updateGuestNotificationDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.guestNotificationsService.deleteGuestNotifications(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
