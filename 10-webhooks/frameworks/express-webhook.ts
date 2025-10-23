/**
 * Cost Katana Webhooks: Express.js Integration
 * 
 * Complete Express.js webhook receiver with signature verification,
 * error handling, and event processing.
 */

import express, { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json());

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your_webhook_secret';

// Webhook signature verification middleware
function verifyWebhookSignature(req: Request, res: Response, next: NextFunction) {
  const signature = req.headers['x-costkatana-signature'] as string;

  if (!signature) {
    return res.status(401).json({ error: 'No signature header' });
  }

  try {
    const [t, v1] = signature.split(',').map(x => x.split('=')[1]);
    const timestamp = parseInt(t);

    // Check timestamp
    const currentTime = Math.floor(Date.now() / 1000);
    if (Math.abs(currentTime - timestamp) > 300) {
      return res.status(401).json({ error: 'Timestamp too old' });
    }

    // Verify signature
    const payload = `${timestamp}.${JSON.stringify(req.body)}`;
    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(payload)
      .digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(v1), Buffer.from(expectedSignature))) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Signature verification failed' });
  }
}

// Webhook event handlers
const eventHandlers = {
  'cost.alert': (event: any) => {
    console.log(`💰 Cost Alert: $${event.data.cost.amount}`);
    // Send Slack notification
    // Update monitoring dashboard
  },

  'budget.exceeded': (event: any) => {
    console.log(`⚠️ Budget Exceeded: ${event.data.budget.percentUsed}%`);
    // Send urgent notification
    // Trigger throttling if needed
  },

  'cost.spike_detected': (event: any) => {
    console.log(`📈 Cost Spike: ${event.data.metrics.changePercentage}% increase`);
    // Investigate cause
    // Alert team
  },

  'security.alert': (event: any) => {
    console.log(`🔒 Security Alert: ${event.data.threat.type}`);
    // Alert security team
    // Log incident
  }
};

// Main webhook endpoint
app.post('/webhooks/costkatana', verifyWebhookSignature, async (req: Request, res: Response) => {
  const event = req.body;

  console.log(`✅ Webhook received: ${event.event_type}`);

  try {
    // Route to appropriate handler
    const handler = eventHandlers[event.event_type as keyof typeof eventHandlers];
    if (handler) {
      await handler(event);
    } else {
      console.log(`No handler for event: ${event.event_type}`);
    }

    // Respond quickly
    res.status(200).json({ received: true, eventId: event.event_id });

  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🥷 Express webhook receiver running on port ${PORT}`);
  console.log(`   Endpoint: POST /webhooks/costkatana`);
});

export default app;
