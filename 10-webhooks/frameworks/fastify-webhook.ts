/**
 * Cost Katana Webhooks: Fastify Integration
 * 
 * High-performance webhook receiver using Fastify.
 */

import Fastify from 'fastify';
import crypto from 'crypto';

const fastify = Fastify({ logger: true });

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your_webhook_secret';

// Signature verification decorator
fastify.decorateRequest('verifyWebhookSignature', function() {
  const signature = this.headers['x-costkatana-signature'] as string;
  
  if (!signature) {
    return false;
  }

  try {
    const [t, v1] = signature.split(',').map(x => x.split('=')[1]);
    const timestamp = parseInt(t);

    const currentTime = Math.floor(Date.now() / 1000);
    if (Math.abs(currentTime - timestamp) > 300) {
      return false;
    }

    const payload = `${timestamp}.${JSON.stringify(this.body)}`;
    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(payload)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(v1),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
});

// Webhook route
fastify.post('/webhooks/costkatana', async (request, reply) => {
  // Verify signature
  if (!request.verifyWebhookSignature()) {
    return reply.code(401).send({ error: 'Invalid signature' });
  }

  const event = request.body as any;

  fastify.log.info(`Webhook received: ${event.event_type}`);

  // Process event
  await processWebhookEvent(event);

  return { received: true, eventId: event.event_id };
});

async function processWebhookEvent(event: any) {
  switch (event.event_type) {
    case 'cost.alert':
      console.log(`💰 Cost Alert: $${event.data.cost.amount}`);
      break;
    case 'budget.exceeded':
      console.log(`⚠️ Budget Exceeded`);
      break;
  }
}

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🥷 Fastify webhook receiver running on port 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

export default fastify;
