/**
 * NestJS Controller: Chat Controller
 * 
 * RESTful endpoints with Cost Katana integration
 */

import { Controller, Post, Get, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';

class ChatDto {
  message: string;
  model?: string;
  options?: {
    temperature?: number;
    maxTokens?: number;
  };
}

class OptimizeDto {
  prompt: string;
  model?: string;
  targetReduction?: number;
}

@Controller('api')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  
  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      service: 'nestjs-cost-katana-api',
      timestamp: new Date().toISOString()
    };
  }
  
  @Post('chat')
  async chat(@Body() chatDto: ChatDto) {
    try {
      const { message, model, options } = chatDto;
      
      if (!message) {
        throw new HttpException('Message is required', HttpStatus.BAD_REQUEST);
      }
      
      return await this.chatService.chat(message, model, options);
      
    } catch (error: any) {
      throw new HttpException(
        {
          error: 'Failed to process chat request',
          message: error.message
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  
  @Post('optimize')
  async optimize(@Body() optimizeDto: OptimizeDto) {
    try {
      const { prompt, model } = optimizeDto;
      
      if (!prompt) {
        throw new HttpException('Prompt is required', HttpStatus.BAD_REQUEST);
      }
      
      return await this.chatService.optimizePrompt(prompt, model);
      
    } catch (error: any) {
      throw new HttpException(
        {
          error: 'Failed to optimize prompt',
          message: error.message
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  
  @Get('analytics')
  async getAnalytics() {
    try {
      return await this.chatService.getAnalytics();
    } catch (error: any) {
      throw new HttpException(
        {
          error: 'Failed to fetch analytics',
          message: error.message
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

