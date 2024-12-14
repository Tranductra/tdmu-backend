import { Test, TestingModule } from '@nestjs/testing';
import { IndustrysService } from './industrys.service';

describe('IndustrysService', () => {
  let service: IndustrysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndustrysService],
    }).compile();

    service = module.get<IndustrysService>(IndustrysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
