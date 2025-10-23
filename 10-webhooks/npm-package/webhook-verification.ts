/**
 * Cost Katana Webhooks: Signature Verification
 * 
 * Secure your webhooks by verifying HMAC signatures.
 * This prevents unauthorized webhook requests.
 * 
 * Run: npx ts-node 10-webhooks/npm-package/webhook-verification.ts
 */

import crypto from 'crypto';
import express from 'express';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your_webhook_secret';

/**
 * Verify webhook signature
 */
function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
  secret: string = WEBHOOK_SECRET
): boolean {
  try {
    // Extract timestamp and signature
    const parts = signature.split(',');
    const timestamp = parts[0].split('=')[1];
    const receivedSignature = parts[1].split('=')[1];

    // Check timestamp (prevent replay attacks)
    const currentTime = Math.floor(Date.now() / 1000);
    const tolerance = 300; // 5 minutes
    if (Math.abs(currentTime - parseInt(timestamp)) > tolerance) {
      console.error('❌ Timestamp too old');
      return false;
    }

    // Construct signed payload
    const signedPayload = `${timestamp}.${payload}`;

    // Compute expected signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(signedPayload, 'utf8')
      .digest('hex');

    // Compare signatures (timing-safe)
    return crypto.timingSafeEqual(
      Buffer.from(receivedSignature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    console.error('❌ Signature verification failed:', error);
    return false;
  }
}

/**
 * Express middleware for webhook verification
 */
function webhookVerificationMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const signature = req.headers['x-costkatana-signature'] as string;

  if (!signature) {
    return res.status(401).json({ error: 'No signature header' });
  }

  const payload = JSON.stringify(req.body);
  const isValid = verifyWebhookSignature(payload, signature);

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  next();
}

/**
 * Example webhook receiver with verification
 */
function createWebhookReceiver() {
  const app = express();
  app.use(express.json());

  // Webhook endpoint with verification
  app.post('/webhooks/secure', webhookVerificationMiddleware, (req, res) => {
    const event = req.body;

    console.log('✅ Verified webhook received:');
    console.log(`   Event: ${event.event_type}`);
    console.log(`   Severity: ${event.data.severity}`);

    // Process the event
    processWebhookEvent(event);

    res.status(200).json({ received: true });
  });

  return app;
}

function processWebhookEvent(event: any) {
  console.log(`Processing: ${event.event_type}`);
  // Your event handling logic here
}

/**
 * Example usage
 */
function main() {
  console.log('🥷 Webhook Signature Verification Example\n');

  // Example 1: Manual verification
  const samplePayload = JSON.stringify({
    event_type: 'cost.alert',
    data: { cost: { amount: 100 } }
  });

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(`${timestamp}.${samplePayload}`)
    .digest('hex');

  const fullSignature = `t=${timestamp},v1=${signature}`;

  console.log('Example signature:', fullSignature);
  console.log('Valid:', verifyWebhookSignature(samplePayload, fullSignature));

  // Example 2: Start webhook receiver
  const app = createWebhookReceiver();
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`\n✅ Secure webhook receiver running on port ${PORT}`);
    console.log('   Endpoint: POST http://localhost:3000/webhooks/secure');
  });
}

if (require.main === module) {
  main();
}

export { verifyWebhookSignature, webhookVerificationMiddleware, createWebhookReceiver };
