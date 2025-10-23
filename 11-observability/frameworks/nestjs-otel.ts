/**
 * Cost Katana + OpenTelemetry: NestJS Integration
 * 
 * Complete NestJS module with OpenTelemetry instrumentation.
 */

import { Module, Injectable, Controller, Post, Body } from '@nestjs/common';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import CostKatana from 'cost-katana';

// Initialize OpenTelemetry (do this in main.ts before app creation)
export function initializeOpenTelemetry() {
  const sdk = new NodeSDK({
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: 'nestjs-ai-app',
    }),
    traceExporter: new OTLPTraceExporter({
      url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
    }),
    instrumentations: [getNodeAutoInstrumentations()],
  });

  sdk.start();
  console.log('✅ OpenTelemetry initialized');
}

// AI Service
@Injectable()
export class AIChatService {
  private costKatana: CostKatana;

  constructor() {
    this.costKatana = new CostKatana({
      apiKey: process.env.COST_KATANA_API_KEY!
    });
  }

  async chat(model: string, messages: any[], sessionId: string) {
    const response = await this.costKatana.chat.completions.create({
      model,
      messages
    }, {
      headers: {
        'X-Session-Id': sessionId,
        'X-Service-Name': 'nestjs-ai-app'
      }
    });

    return {
      message: response.choices[0].message,
      trace: {
        traceId: response.headers?.['x-trace-id'],
        duration: response.headers?.['x-request-duration'],
        cost: response.headers?.['x-cost']
      }
    };
  }
}

// AI Controller
@Controller('api')
export class AIChatController {
  constructor(private readonly aiChatService: AIChatService) {}

  @Post('chat')
  async chat(@Body() body: { model?: string; messages: any[] }) {
    const sessionId = `session_${Date.now()}`;
    return this.aiChatService.chat(
      body.model || 'gpt-4',
      body.messages,
      sessionId
    );
  }
}

// AI Module
@Module({
  controllers: [AIChatController],
  providers: [AIChatService],
  exports: [AIChatService]
})
export class AIModule {}

// Usage in main.ts:
// import { initializeOpenTelemetry } from './otel';
// 
// async function bootstrap() {
//   initializeOpenTelemetry();
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
//   console.log('🥷 NestJS + OpenTelemetry running');
// }
// bootstrap();
