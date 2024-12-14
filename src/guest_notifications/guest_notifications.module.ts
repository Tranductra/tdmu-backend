import { Module } from '@nestjs/common';
import { GuestNotificationsController } from './guest_notifications.controller';
import { GuestNotificationsService } from './guest_notifications.service';

@Module({
  controllers: [GuestNotificationsController],
  providers: [GuestNotificationsService]
})
export class GuestNotificationsModule {}
