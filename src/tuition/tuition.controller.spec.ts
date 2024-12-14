import { Test, TestingModule } from '@nestjs/testing';
import { TuitionController } from './tuition.controller';

describe('TuitionController', () => {
  let controller: TuitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TuitionController],
    }).compile();

    controller = module.get<TuitionController>(TuitionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
