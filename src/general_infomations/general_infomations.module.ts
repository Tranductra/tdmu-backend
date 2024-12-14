import { Module } from '@nestjs/common';
import { GeneralInfomationsController } from './general_infomations.controller';
import { GeneralInfomationsService } from './general_infomations.service';

@Module({
  controllers: [GeneralInfomationsController],
  providers: [GeneralInfomationsService]
})
export class GeneralInfomationsModule {}
