/**
 * Cost Katana + OpenTelemetry: Fastify Integration
 * 
 * High-performance Fastify server with OpenTelemetry.
 */

import Fastify from 'fastify';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import CostKatana from 'cost-katana';

// Initialize OpenTelemetry
const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'fastify-ai-app',
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

const fastify = Fastify({ logger: true });

const costKatana = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!
});

// AI chat endpoint
fastify.post('/api/chat', async (request, reply) => {
  const { model, messages } = request.body as any;
  const sessionId = (request.headers['x-session-id'] as string) || `session_${Date.now()}`;
  
  try {
    const response = await costKatana.chat.completions.create({
      model: model || 'gpt-4',
      messages
    }, {
      headers: {
        'X-Session-Id': sessionId,
        'X-Service-Name': 'fastify-ai-app'
      }
    });
    
    return {
      message: response.choices[0].message,
      trace: {
        traceId: response.headers?.['x-trace-id'],
        cost: response.headers?.['x-cost']
      }
    };
  } catch (error: any) {
    reply.status(500).send({ error: error.message });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🥷 Fastify + OpenTelemetry running on port 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

export default fastify;
