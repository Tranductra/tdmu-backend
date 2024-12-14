import { Test, TestingModule } from '@nestjs/testing';
import { GuestNotificationsService } from './guest_notifications.service';

describe('GuestNotificationsService', () => {
  let service: GuestNotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuestNotificationsService],
    }).compile();

    service = module.get<GuestNotificationsService>(GuestNotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
