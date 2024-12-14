import { Module } from '@nestjs/common';
import { MajorsController } from './majors.controller';
import { MajorsService } from './majors.service';

@Module({
  controllers: [MajorsController],
  providers: [MajorsService]
})
export class MajorsModule {}
