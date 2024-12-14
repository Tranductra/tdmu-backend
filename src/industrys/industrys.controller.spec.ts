import { Test, TestingModule } from '@nestjs/testing';
import { IndustrysController } from './industrys.controller';

describe('IndustrysController', () => {
  let controller: IndustrysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndustrysController],
    }).compile();

    controller = module.get<IndustrysController>(IndustrysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
