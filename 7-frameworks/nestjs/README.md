# NestJS + Cost Katana

Enterprise-grade application with dependency injection.

## Setup

```bash
npm i -g @nestjs/cli
nest new my-app
cd my-app
npm install cost-katana
```

## Service Example

```typescript
// chat.service.ts
import { Injectable } from '@nestjs/common';
import { ai } from 'cost-katana';

@Injectable()
export class ChatService {
  async chat(message: string) {
    return await ai('gpt-4', message, {
      cortex: true,
      cache: true
    });
  }
  
  async getAnalytics() {
    // Analytics logic
  }
}
```

## Controller Example

```typescript
// chat.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('api/chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  
  @Post()
  async chat(@Body('message') message: string) {
    return await this.chatService.chat(message);
  }
}
```

## Features

- ✅ Dependency injection
- ✅ Service-based architecture
- ✅ Guards and interceptors
- ✅ Testing utilities
- ✅ Microservices support
