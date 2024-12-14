import { Test, TestingModule } from '@nestjs/testing';
import { GeneralInfomationsController } from './general_infomations.controller';

describe('GeneralInfomationsController', () => {
  let controller: GeneralInfomationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralInfomationsController],
    }).compile();

    controller = module.get<GeneralInfomationsController>(GeneralInfomationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
