import { Module } from '@nestjs/common';
import { IndustrysController } from './industrys.controller';
import { IndustrysService } from './industrys.service';

@Module({
  controllers: [IndustrysController],
  providers: [IndustrysService]
})
export class IndustrysModule {}
