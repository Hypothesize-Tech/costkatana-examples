/**
 * Cost Katana Webhooks: Retry Policies
 * 
 * Configure automatic retry behavior for failed webhook deliveries.
 * 
 * Run: npx ts-node 10-webhooks/npm-package/retry-policies.ts
 */

import axios from 'axios';

const API_BASE_URL = 'https://cost-katana-backend.store/api';
const API_KEY = process.env.COST_KATANA_API_KEY;

async function createWebhookWithRetryPolicy() {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/webhooks`,
      {
        name: 'Webhook with Custom Retry Policy',
        url: 'https://your-server.com/webhooks/endpoint',
        events: ['cost.alert', 'budget.exceeded'],
        active: true,
        secret: 'your_webhook_secret',
        retryConfig: {
          maxRetries: 5,              // Retry up to 5 times
          backoffMultiplier: 2,       // Exponential backoff (2x each retry)
          initialDelay: 5000          // Start with 5 second delay
        }
        // Retry schedule: 5s, 10s, 20s, 40s, 80s
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Webhook created with retry policy:');
    console.log('   Max Retries:', response.data.webhook.retryConfig.maxRetries);
    console.log('   Backoff Multiplier:', response.data.webhook.retryConfig.backoffMultiplier);
    console.log('   Initial Delay:', response.data.webhook.retryConfig.initialDelay, 'ms');
    console.log('\n📊 Retry schedule:');
    console.log('   Attempt 1: Immediate');
    console.log('   Attempt 2: 5 seconds');
    console.log('   Attempt 3: 10 seconds');
    console.log('   Attempt 4: 20 seconds');
    console.log('   Attempt 5: 40 seconds');
    console.log('   Attempt 6: 80 seconds');

    return response.data.webhook;
  } catch (error: any) {
    console.error('❌ Failed:', error.response?.data || error.message);
    throw error;
  }
}

async function main() {
  if (!API_KEY) {
    console.error('❌ COST_KATANA_API_KEY required');
    process.exit(1);
  }

  console.log('🥷 Webhook Retry Policies Example\n');
  
  try {
    await createWebhookWithRetryPolicy();
    console.log('\n✅ Webhook configured with automatic retries!');
  } catch (error) {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { createWebhookWithRetryPolicy };
