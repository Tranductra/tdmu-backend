import { Test, TestingModule } from '@nestjs/testing';
import { MessageNodeController } from './message_node.controller';

describe('MessageNodeController', () => {
  let controller: MessageNodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageNodeController],
    }).compile();

    controller = module.get<MessageNodeController>(MessageNodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
