import { Test, TestingModule } from '@nestjs/testing';
import { GeneralInfomationsService } from './general_infomations.service';

describe('GeneralInfomationsService', () => {
  let service: GeneralInfomationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralInfomationsService],
    }).compile();

    service = module.get<GeneralInfomationsService>(GeneralInfomationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
