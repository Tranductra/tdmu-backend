import { Test, TestingModule } from '@nestjs/testing';
import { GuestNotificationsController } from './guest_notifications.controller';

describe('GuestNotificationsController', () => {
  let controller: GuestNotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuestNotificationsController],
    }).compile();

    controller = module.get<GuestNotificationsController>(GuestNotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
