/**
 * Cost Katana OpenTelemetry: Basic Distributed Tracing
 * 
 * Enable distributed tracing across your AI applications to track
 * requests, monitor performance, and attribute costs.
 * 
 * Setup:
 * 1. npm install cost-katana @opentelemetry/api
 * 2. Set COST_KATANA_API_KEY
 * 3. Run: npx ts-node 11-observability/npm-package/basic-tracing.ts
 */

import CostKatana from 'cost-katana';
import { trace, context, SpanStatusCode } from '@opentelemetry/api';
import { v4 as uuidv4 } from 'uuid';

const client = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!
});

/**
 * Example 1: Basic traced AI request
 */
async function basicTracedRequest() {
  const sessionId = uuidv4();
  
  console.log('1️⃣ Making traced AI request...');
  console.log(`   Session ID: ${sessionId}`);

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'user', content: 'Explain distributed tracing in AI systems' }
      ]
    }, {
      // Trace context headers
      headers: {
        'X-Session-Id': sessionId,
        'X-Service-Name': 'my-ai-app'
      }
    });

    console.log('✅ Response received with trace context:');
    console.log(`   Trace ID: ${response.headers?.['x-trace-id']}`);
    console.log(`   Duration: ${response.headers?.['x-request-duration']}`);
    console.log(`   Cost: $${response.headers?.['x-cost']}`);
    console.log(`   Tokens: ${response.usage?.total_tokens}`);

    return {
      sessionId,
      traceId: response.headers?.['x-trace-id'],
      cost: response.headers?.['x-cost']
    };
  } catch (error) {
    console.error('❌ Request failed:', error);
    throw error;
  }
}

/**
 * Example 2: Multi-request session tracking
 */
async function multiRequestSession() {
  const sessionId = `session_${uuidv4()}`;
  
  console.log('\n2️⃣ Starting multi-request session...');
  console.log(`   Session ID: ${sessionId}`);

  const traces = [];

  try {
    // Request 1: Extract entities
    console.log('\n   Request 1: Extract entities...');
    const response1 = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'user', content: 'Extract entities from: John works at Acme Corp in New York' }
      ]
    }, {
      headers: {
        'X-Session-Id': sessionId,
        'X-Span-Name': 'entity_extraction'
      }
    });
    traces.push({
      operation: 'entity_extraction',
      traceId: response1.headers?.['x-trace-id'],
      duration: response1.headers?.['x-request-duration'],
      cost: response1.headers?.['x-cost']
    });

    // Request 2: Classify sentiment (child of session)
    console.log('   Request 2: Classify sentiment...');
    const response2 = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: 'Classify sentiment: This product is amazing!' }
      ]
    }, {
      headers: {
        'X-Session-Id': sessionId,
        'X-Parent-Trace-Id': response1.headers?.['x-trace-id'],
        'X-Span-Name': 'sentiment_classification'
      }
    });
    traces.push({
      operation: 'sentiment_classification',
      traceId: response2.headers?.['x-trace-id'],
      parentId: response1.headers?.['x-trace-id'],
      duration: response2.headers?.['x-request-duration'],
      cost: response2.headers?.['x-cost']
    });

    console.log('\n✅ Session complete:');
    console.log(`   Total traces: ${traces.length}`);
    console.log(`   Total cost: $${traces.reduce((sum, t) => sum + parseFloat(t.cost || '0'), 0).toFixed(4)}`);
    
    // View session details
    const session = await viewSessionTrace(sessionId);
    return session;

  } catch (error) {
    console.error('❌ Session failed:', error);
    throw error;
  }
}

/**
 * Example 3: W3C Trace Context propagation
 */
async function w3cTraceContext() {
  console.log('\n3️⃣ Using W3C Trace Context standard...');

  // Generate W3C compliant trace context
  const traceId = generateTraceId();
  const spanId = generateSpanId();
  const traceparent = `00-${traceId}-${spanId}-01`;

  console.log(`   traceparent: ${traceparent}`);

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'user', content: 'What is W3C Trace Context?' }
      ]
    }, {
      headers: {
        'traceparent': traceparent,
        'tracestate': 'costkatana=tracked,vendor=myapp'
      }
    });

    console.log('✅ Request traced with W3C standard');
    console.log(`   Cost Katana Trace ID: ${response.headers?.['x-trace-id']}`);
    console.log(`   W3C Trace ID: ${traceId}`);

    return response;
  } catch (error) {
    console.error('❌ Failed:', error);
    throw error;
  }
}

/**
 * Example 4: View session traces
 */
async function viewSessionTrace(sessionId: string) {
  console.log(`\n4️⃣ Retrieving session trace: ${sessionId}`);

  try {
    const response = await fetch(
      `https://cost-katana-backend.store/api/v1/sessions/${sessionId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.COST_KATANA_API_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get session: ${response.status}`);
    }

    const session = await response.json();

    console.log('✅ Session trace retrieved:');
    console.log(`   Session ID: ${session.sessionId}`);
    console.log(`   Total Traces: ${session.traces?.length || 0}`);
    console.log(`   Total Cost: $${session.totalCost || 0}`);
    console.log(`   Total Duration: ${session.totalDuration || 0}ms`);

    if (session.traces) {
      console.log('\n   Trace Hierarchy:');
      session.traces.forEach((trace: any, index: number) => {
        const indent = trace.parentId ? '   └─' : '   ├─';
        console.log(`${indent} ${trace.operation || 'request'}`);
        console.log(`      Trace ID: ${trace.traceId}`);
        console.log(`      Duration: ${trace.duration}ms`);
        console.log(`      Cost: $${trace.cost}`);
      });
    }

    return session;
  } catch (error: any) {
    console.error('❌ Failed to retrieve session:', error.message);
    throw error;
  }
}

/**
 * Example 5: Error tracking with traces
 */
async function tracedErrorHandling() {
  const sessionId = `error_session_${uuidv4()}`;
  
  console.log('\n5️⃣ Demonstrating error tracking...');

  try {
    // This will fail - invalid model
    await client.chat.completions.create({
      model: 'invalid-model-name',
      messages: [{ role: 'user', content: 'Test' }]
    }, {
      headers: {
        'X-Session-Id': sessionId,
        'X-Span-Name': 'error_test'
      }
    });
  } catch (error: any) {
    console.log('✅ Error captured in trace:');
    console.log(`   Session ID: ${sessionId}`);
    console.log(`   Error: ${error.message}`);
    console.log(`   Error is automatically recorded in trace span`);
    
    // View the failed trace
    await viewSessionTrace(sessionId);
  }
}

/**
 * Utility: Generate W3C trace ID (128-bit hex)
 */
function generateTraceId(): string {
  return Array.from({ length: 32 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

/**
 * Utility: Generate W3C span ID (64-bit hex)
 */
function generateSpanId(): string {
  return Array.from({ length: 16 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

/**
 * Main example runner
 */
async function main() {
  if (!process.env.COST_KATANA_API_KEY) {
    console.error('❌ COST_KATANA_API_KEY environment variable required');
    process.exit(1);
  }

  console.log('🥷 Cost Katana OpenTelemetry: Basic Tracing\n');

  try {
    // Run examples
    await basicTracedRequest();
    await multiRequestSession();
    await w3cTraceContext();
    await tracedErrorHandling();

    console.log('\n✅ All tracing examples complete!');
    console.log('\n💡 Next steps:');
    console.log('   - View traces in Cost Katana dashboard');
    console.log('   - Export to Jaeger/Zipkin for visualization');
    console.log('   - Set up alerts on trace metrics');
    console.log('   - Integrate with your APM solution');
    console.log('\n📊 Benefits:');
    console.log('   - Track request flows across services');
    console.log('   - Monitor AI performance in real-time');
    console.log('   - Debug issues with full context');
    console.log('   - Attribute costs accurately');

  } catch (error) {
    console.error('\n❌ Example failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export {
  basicTracedRequest,
  multiRequestSession,
  w3cTraceContext,
  viewSessionTrace,
  tracedErrorHandling
};

