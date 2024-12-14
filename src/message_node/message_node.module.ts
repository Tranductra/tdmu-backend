import { Module } from '@nestjs/common';
import { MessageNodeService } from './message_node.service';
import { MessageNodeController } from './message_node.controller';

@Module({
  controllers: [MessageNodeController],
  providers: [MessageNodeService]
})
export class MessageNodeModule {}
