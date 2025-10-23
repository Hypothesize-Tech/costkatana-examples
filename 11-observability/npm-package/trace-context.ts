/**
 * Cost Katana OpenTelemetry: Trace Context Propagation
 * 
 * Propagate trace context across microservices for end-to-end visibility.
 * 
 * Run: npx ts-node 11-observability/npm-package/trace-context.ts
 */

import CostKatana from 'cost-katana';
import { v4 as uuidv4 } from 'uuid';

const client = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!
});

async function microserviceFlow() {
  console.log('🥷 Microservice Trace Context Propagation\n');

  const sessionId = `microservice_${uuidv4()}`;
  const traceId = generateTraceId();

  // Service A: API Gateway
  console.log('1️⃣ Service A (API Gateway)');
  const serviceA = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Process incoming request' }]
  }, {
    headers: {
      'X-Session-Id': sessionId,
      'X-Service-Name': 'api-gateway',
      'traceparent': `00-${traceId}-${generateSpanId()}-01`,
      'baggage': 'user_id=user123,tenant_id=tenant456'
    }
  });
  console.log(`   ✅ Trace ID: ${serviceA.headers?.['x-trace-id']}`);

  // Service B: Business Logic (child of A)
  console.log('\n2️⃣ Service B (Business Logic)');
  const serviceB = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Apply business rules' }]
  }, {
    headers: {
      'X-Session-Id': sessionId,
      'X-Parent-Trace-Id': serviceA.headers?.['x-trace-id'],
      'X-Service-Name': 'business-logic',
      'traceparent': `00-${traceId}-${generateSpanId()}-01`,
      'baggage': 'user_id=user123,tenant_id=tenant456'
    }
  });
  console.log(`   ✅ Trace ID: ${serviceB.headers?.['x-trace-id']}`);

  // Service C: Data Processing (child of B)
  console.log('\n3️⃣ Service C (Data Processing)');
  const serviceC = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Process data' }]
  }, {
    headers: {
      'X-Session-Id': sessionId,
      'X-Parent-Trace-Id': serviceB.headers?.['x-trace-id'],
      'X-Service-Name': 'data-processor',
      'traceparent': `00-${traceId}-${generateSpanId()}-01`,
      'baggage': 'user_id=user123,tenant_id=tenant456'
    }
  });
  console.log(`   ✅ Trace ID: ${serviceC.headers?.['x-trace-id']}`);

  console.log('\n✅ Microservice flow traced end-to-end!');
  console.log(`   Session: ${sessionId}`);
  console.log(`   W3C Trace: ${traceId}`);
}

function generateTraceId(): string {
  return Array.from({ length: 32 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

function generateSpanId(): string {
  return Array.from({ length: 16 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

async function main() {
  if (!process.env.COST_KATANA_API_KEY) {
    console.error('❌ COST_KATANA_API_KEY required');
    process.exit(1);
  }

  await microserviceFlow();
}

if (require.main === module) {
  main();
}

export { microserviceFlow };
