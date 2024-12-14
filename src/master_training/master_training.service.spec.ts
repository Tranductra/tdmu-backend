import { Test, TestingModule } from '@nestjs/testing';
import { MasterTrainingService } from './master_training.service';

describe('MasterTrainingService', () => {
  let service: MasterTrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterTrainingService],
    }).compile();

    service = module.get<MasterTrainingService>(MasterTrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
