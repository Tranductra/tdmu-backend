import { Test, TestingModule } from '@nestjs/testing';
import { MasterTrainingController } from './master_training.controller';

describe('MasterTrainingController', () => {
  let controller: MasterTrainingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterTrainingController],
    }).compile();

    controller = module.get<MasterTrainingController>(MasterTrainingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
