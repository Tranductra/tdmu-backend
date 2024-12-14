import { Test, TestingModule } from '@nestjs/testing';
import { ContinuingEducationService } from './continuing_education.service';

describe('ContinuingEducationService', () => {
  let service: ContinuingEducationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContinuingEducationService],
    }).compile();

    service = module.get<ContinuingEducationService>(ContinuingEducationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
