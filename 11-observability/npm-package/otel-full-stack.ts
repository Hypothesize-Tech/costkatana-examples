/**
 * Cost Katana OpenTelemetry: Complete Observability Setup
 * 
 * Full-stack OpenTelemetry integration with traces, metrics, and logs.
 * 
 * Run: npx ts-node 11-observability/npm-package/otel-full-stack.ts
 */

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME, SEMRESATTRS_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import CostKatana from 'cost-katana';

// Initialize OpenTelemetry SDK
const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'my-ai-app',
    [SEMRESATTRS_SERVICE_VERSION]: '1.0.0',
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/metrics',
    }),
    exportIntervalMillis: 60000,
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': { enabled: false },
    }),
  ],
});

async function initializeObservability() {
  console.log('🥷 Initializing Complete Observability Stack\n');

  try {
    // Start OpenTelemetry SDK
    await sdk.start();
    console.log('✅ OpenTelemetry SDK started');

    // Initialize Cost Katana client
    const client = new CostKatana({
      apiKey: process.env.COST_KATANA_API_KEY!,
    });
    console.log('✅ Cost Katana client initialized');

    // Make traced request
    console.log('\n📊 Making traced AI request...');
    const response = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'Hello with full observability!' }]
    }, {
      headers: {
        'X-Session-Id': 'fullstack_demo',
        'X-Service-Name': 'my-ai-app',
        'X-Span-Name': 'ai_inference'
      }
    });

    console.log('✅ Request completed with observability:');
    console.log(`   Trace ID: ${response.headers?.['x-trace-id']}`);
    console.log(`   Duration: ${response.headers?.['x-request-duration']}`);
    console.log(`   Cost: $${response.headers?.['x-cost']}`);

    console.log('\n📈 Telemetry exported to:');
    console.log(`   Traces: ${process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318'}/v1/traces`);
    console.log(`   Metrics: ${process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318'}/v1/metrics`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sdk.shutdown();
    console.log('\n✅ OpenTelemetry SDK shutdown complete');
  }
}

async function main() {
  if (!process.env.COST_KATANA_API_KEY) {
    console.error('❌ COST_KATANA_API_KEY required');
    process.exit(1);
  }

  await initializeObservability();
}

if (require.main === module) {
  main();
}

export { initializeObservability };
