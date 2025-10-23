/**
 * Cost Katana + OpenTelemetry: Express.js Integration
 * 
 * Complete Express app with OpenTelemetry instrumentation.
 */

import express from 'express';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import CostKatana from 'cost-katana';

// Initialize OpenTelemetry
const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'express-ai-app',
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

const app = express();
app.use(express.json());

const costKatana = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!
});

// Middleware to add trace context
app.use((req, res, next) => {
  req.headers['x-session-id'] = req.headers['x-session-id'] || `session_${Date.now()}`;
  next();
});

// AI endpoint with tracing
app.post('/api/chat', async (req, res) => {
  try {
    const response = await costKatana.chat.completions.create({
      model: req.body.model || 'gpt-4',
      messages: req.body.messages
    }, {
      headers: {
        'X-Session-Id': req.headers['x-session-id'] as string,
        'X-Service-Name': 'express-ai-app',
        'X-Span-Name': 'ai_chat'
      }
    });

    res.json({
      message: response.choices[0].message,
      trace: {
        traceId: response.headers?.['x-trace-id'],
        duration: response.headers?.['x-request-duration'],
        cost: response.headers?.['x-cost']
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🥷 Express + OpenTelemetry running on port ${PORT}`);
  console.log(`   Traces exported to: ${process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318'}`);
});

export default app;
