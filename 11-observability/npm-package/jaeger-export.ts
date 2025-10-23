/**
 * Cost Katana OpenTelemetry: Jaeger Export
 * 
 * Export traces to Jaeger for visualization and analysis.
 * 
 * Setup:
 * 1. Run Jaeger: docker run -d -p16686:16686 -p4318:4318 jaegertracing/all-in-one:latest
 * 2. Run: npx ts-node 11-observability/npm-package/jaeger-export.ts
 * 3. View: http://localhost:16686
 */

import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import CostKatana from 'cost-katana';

async function exportToJaeger() {
  console.log('🥷 Exporting Cost Katana Traces to Jaeger\n');

  // Configure Jaeger exporter
  const jaegerExporter = new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces',
  });

  const sdk = new NodeSDK({
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: 'cost-katana-example',
    }),
    spanProcessor: new BatchSpanProcessor(jaegerExporter),
  });

  try {
    await sdk.start();
    console.log('✅ Connected to Jaeger');

    const client = new CostKatana({
      apiKey: process.env.COST_KATANA_API_KEY!,
    });

    // Make multiple requests to create interesting traces
    console.log('\n📊 Creating sample traces...');
    
    for (let i = 1; i <= 3; i++) {
      const response = await client.chat.completions.create({
        model: i === 3 ? 'gpt-3.5-turbo' : 'gpt-4',
        messages: [{ role: 'user', content: `Test request ${i}` }]
      }, {
        headers: {
          'X-Session-Id': 'jaeger_demo',
          'X-Span-Name': `request_${i}`
        }
      });
      console.log(`   ✅ Request ${i}: ${response.headers?.['x-trace-id']}`);
    }

    console.log('\n✅ Traces exported to Jaeger!');
    console.log('   View at: http://localhost:16686');
    console.log('   Service: cost-katana-example');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sdk.shutdown();
  }
}

async function main() {
  if (!process.env.COST_KATANA_API_KEY) {
    console.error('❌ COST_KATANA_API_KEY required');
    process.exit(1);
  }

  await exportToJaeger();
}

if (require.main === module) {
  main();
}

export { exportToJaeger };
