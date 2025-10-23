/**
 * Cost Katana + OpenTelemetry: Next.js Integration
 * 
 * Location: app/api/chat/route.ts (App Router)
 */

import { NextRequest, NextResponse } from 'next/server';
import CostKatana from 'cost-katana';
import { trace } from '@opentelemetry/api';

const costKatana = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!
});

export async function POST(request: NextRequest) {
  const tracer = trace.getTracer('nextjs-ai-app');
  
  return tracer.startActiveSpan('ai_request', async (span) => {
    try {
      const body = await request.json();
      const sessionId = request.headers.get('x-session-id') || `session_${Date.now()}`;
      
      span.setAttribute('session.id', sessionId);
      span.setAttribute('model', body.model || 'gpt-4');
      
      const response = await costKatana.chat.completions.create({
        model: body.model || 'gpt-4',
        messages: body.messages
      }, {
        headers: {
          'X-Session-Id': sessionId,
          'X-Service-Name': 'nextjs-ai-app'
        }
      });
      
      span.setAttribute('trace.id', response.headers?.['x-trace-id'] || '');
      span.setAttribute('cost', parseFloat(response.headers?.['x-cost'] || '0'));
      
      span.end();
      
      return NextResponse.json({
        message: response.choices[0].message,
        trace: {
          traceId: response.headers?.['x-trace-id'],
          cost: response.headers?.['x-cost']
        }
      });
      
    } catch (error: any) {
      span.recordException(error);
      span.end();
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  });
}

// next.config.js configuration:
// module.exports = {
//   experimental: {
//     instrumentationHook: true,
//   },
// };

// instrumentation.ts at root:
// export async function register() {
//   if (process.env.NEXT_RUNTIME === 'nodejs') {
//     const { NodeSDK } = await import('@opentelemetry/sdk-node');
//     const sdk = new NodeSDK({...});
//     sdk.start();
//   }
// }
