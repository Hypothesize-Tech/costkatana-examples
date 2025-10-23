/**
 * Cost Katana Webhooks: NestJS Integration
 * 
 * Complete NestJS module for webhook handling.
 */

import { Module, Controller, Post, Body, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

// Webhook Service
@Injectable()
export class WebhookService {
  private readonly secret = process.env.WEBHOOK_SECRET || 'your_webhook_secret';

  verifySignature(payload: string, signature: string): boolean {
    try {
      const [t, v1] = signature.split(',').map(x => x.split('=')[1]);
      const timestamp = parseInt(t);

      const currentTime = Math.floor(Date.now() / 1000);
      if (Math.abs(currentTime - timestamp) > 300) {
        return false;
      }

      const signedPayload = `${timestamp}.${payload}`;
      const expectedSignature = crypto
        .createHmac('sha256', this.secret)
        .update(signedPayload)
        .digest('hex');

      return crypto.timingSafeEqual(
        Buffer.from(v1),
        Buffer.from(expectedSignature)
      );
    } catch {
      return false;
    }
  }

  async handleCostAlert(event: any) {
    console.log(`💰 Cost Alert: $${event.data.cost.amount}`);
    // Your business logic
  }

  async handleBudgetExceeded(event: any) {
    console.log(`⚠️ Budget Exceeded: ${event.data.budget.percentUsed}%`);
    // Your business logic
  }

  async processEvent(event: any) {
    switch (event.event_type) {
      case 'cost.alert':
        await this.handleCostAlert(event);
        break;
      case 'budget.exceeded':
        await this.handleBudgetExceeded(event);
        break;
      default:
        console.log(`Unhandled event: ${event.event_type}`);
    }
  }
}

// Webhook Controller
@Controller('webhooks')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('costkatana')
  async handleWebhook(
    @Body() body: any,
    @Headers('x-costkatana-signature') signature: string
  ) {
    // Verify signature
    const payload = JSON.stringify(body);
    if (!this.webhookService.verifySignature(payload, signature)) {
      throw new HttpException('Invalid signature', HttpStatus.UNAUTHORIZED);
    }

    // Process event
    await this.webhookService.processEvent(body);

    return {
      received: true,
      eventId: body.event_id
    };
  }
}

// Webhook Module
@Module({
  controllers: [WebhookController],
  providers: [WebhookService],
  exports: [WebhookService]
})
export class WebhookModule {}

// Usage in AppModule:
// @Module({
//   imports: [WebhookModule],
//   ...
// })
// export class AppModule {}
