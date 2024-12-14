import { Test, TestingModule } from '@nestjs/testing';
import { ContinuingEducationController } from './continuing_education.controller';

describe('ContinuingEducationController', () => {
  let controller: ContinuingEducationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContinuingEducationController],
    }).compile();

    controller = module.get<ContinuingEducationController>(ContinuingEducationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
