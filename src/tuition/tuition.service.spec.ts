import { Test, TestingModule } from '@nestjs/testing';
import { TuitionService } from './tuition.service';

describe('TuitionService', () => {
  let service: TuitionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TuitionService],
    }).compile();

    service = module.get<TuitionService>(TuitionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
