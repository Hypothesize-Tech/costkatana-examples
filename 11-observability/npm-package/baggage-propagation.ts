/**
 * Cost Katana OpenTelemetry: Baggage Propagation
 * 
 * Propagate business context across service boundaries using OpenTelemetry Baggage.
 * 
 * Run: npx ts-node 11-observability/npm-package/baggage-propagation.ts
 */

import CostKatana from 'cost-katana';
import { v4 as uuidv4 } from 'uuid';

const client = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!
});

async function baggagePropagationExample() {
  console.log('🥷 OpenTelemetry Baggage Propagation\n');

  const sessionId = `baggage_${uuidv4()}`;
  
  // Define baggage items (business context)
  const baggage = {
    user_id: 'user_12345',
    tenant_id: 'tenant_acme',
    team: 'engineering',
    project: 'ai-backend',
    cost_center: 'cc_789',
    environment: 'production',
    feature_flag_ai_beta: 'true'
  };

  const baggageHeader = Object.entries(baggage)
    .map(([key, value]) => `${key}=${value}`)
    .join(',');

  console.log('📦 Baggage context:');
  Object.entries(baggage).forEach(([key, value]) => {
    console.log(`   ${key}: ${value}`);
  });

  try {
    // Service 1: Propagate baggage
    console.log('\n1️⃣ Service 1: Creating request with baggage...');
    const response1 = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'Process with context' }]
    }, {
      headers: {
        'X-Session-Id': sessionId,
        'baggage': baggageHeader
      }
    });
    console.log(`   ✅ Trace ID: ${response1.headers?.['x-trace-id']}`);
    console.log('   Baggage automatically propagated to Cost Katana');

    // Service 2: Baggage continues
    console.log('\n2️⃣ Service 2: Baggage continues automatically...');
    const response2 = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Continue with same context' }]
    }, {
      headers: {
        'X-Session-Id': sessionId,
        'X-Parent-Trace-Id': response1.headers?.['x-trace-id'],
        'baggage': baggageHeader
      }
    });
    console.log(`   ✅ Trace ID: ${response2.headers?.['x-trace-id']}`);
    console.log('   Same baggage context maintained');

    console.log('\n✅ Baggage propagated successfully!');
    console.log('\n💡 Use cases:');
    console.log('   - Track costs by user/tenant');
    console.log('   - A/B test variant tracking');
    console.log('   - Feature flag propagation');
    console.log('   - Cost center allocation');
    console.log('   - Request correlation');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

async function main() {
  if (!process.env.COST_KATANA_API_KEY) {
    console.error('❌ COST_KATANA_API_KEY required');
    process.exit(1);
  }

  await baggagePropagationExample();
}

if (require.main === module) {
  main();
}

export { baggagePropagationExample };
