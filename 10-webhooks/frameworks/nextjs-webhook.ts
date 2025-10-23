/**
 * Cost Katana Webhooks: Next.js API Route
 * 
 * Location: app/api/webhooks/costkatana/route.ts (App Router)
 * or pages/api/webhooks/costkatana.ts (Pages Router)
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET!;

function verifySignature(payload: string, signature: string): boolean {
  try {
    const [t, v1] = signature.split(',').map(x => x.split('=')[1]);
    const timestamp = parseInt(t);

    // Check timestamp
    const currentTime = Math.floor(Date.now() / 1000);
    if (Math.abs(currentTime - timestamp) > 300) {
      return false;
    }

    // Verify signature
    const signedPayload = `${timestamp}.${payload}`;
    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
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

// App Router (Next.js 13+)
export async function POST(request: NextRequest) {
  const signature = request.headers.get('x-costkatana-signature');
  
  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 401 });
  }

  const body = await request.text();
  
  if (!verifySignature(body, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(body);

  // Process event
  console.log(`✅ Webhook: ${event.event_type}`);

  switch (event.event_type) {
    case 'cost.alert':
      // Handle cost alert
      await handleCostAlert(event);
      break;
    
    case 'budget.exceeded':
      // Handle budget exceeded
      await handleBudgetExceeded(event);
      break;
  }

  return NextResponse.json({ received: true });
}

async function handleCostAlert(event: any) {
  // Your logic here
  console.log(`💰 Cost: $${event.data.cost.amount}`);
}

async function handleBudgetExceeded(event: any) {
  // Your logic here
  console.log(`⚠️ Budget exceeded`);
}
