import { Test, TestingModule } from '@nestjs/testing';
import { MessageNodeService } from './message_node.service';

describe('MessageNodeService', () => {
  let service: MessageNodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageNodeService],
    }).compile();

    service = module.get<MessageNodeService>(MessageNodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
