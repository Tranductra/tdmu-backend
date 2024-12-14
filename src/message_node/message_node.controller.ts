import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageNode } from 'src/message_node/dto/message_node.dto';
import { MessageNodeService } from 'src/message_node/message_node.service';

@ApiTags('Message Node')
@Controller('message-node')
export class MessageNodeController {
  constructor(private readonly messageNodeService: MessageNodeService) {}

  @Get()
  async getAll() {
    try {
      return await this.messageNodeService.getAllMessageNode();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.messageNodeService.getMessageNodeById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() messageNode: MessageNode) {
    try {
      return await this.messageNodeService.createMessageNode(messageNode);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMessageNodeDto: MessageNode,
  ) {
    try {
      return await this.messageNodeService.updateMessageNode(
        id,
        updateMessageNodeDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.messageNodeService.deleteMessageNode(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/reply')
  @ApiOperation({ summary: 'Gửi phản hồi cho tin nhắn và gửi email thông báo' })
  @ApiParam({ name: 'id', description: 'ID của tin nhắn cần phản hồi', type: String })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        reply: {
          type: 'string',
          example: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.',
          description: 'Nội dung phản hồi từ admin.',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Phản hồi đã được gửi qua email và cập nhật thành công.' })
  @ApiResponse({ status: 400, description: 'Nội dung phản hồi không được để trống.' })
  @ApiResponse({ status: 500, description: 'Lỗi máy chủ.' })
  async replyToMessage(
    @Param('id') messageId: string,
    @Body('reply') reply: string,
  ) {
    if (!reply) {
      throw new HttpException('Nội dung phản hồi không được để trống', HttpStatus.BAD_REQUEST);
    }

    try {
      const response = await this.messageNodeService.replyMessage(messageId, reply);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
