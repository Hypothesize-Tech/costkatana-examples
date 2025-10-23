/**
 * Cost Katana Webhooks: Testing Webhooks
 * 
 * Test webhook deliveries before going to production.
 * 
 * Run: npx ts-node 10-webhooks/npm-package/webhook-testing.ts
 */

import axios from 'axios';

const API_BASE_URL = 'https://cost-katana-backend.store/api';
const API_KEY = process.env.COST_KATANA_API_KEY;

async function testWebhook(webhookId: string, eventType: string, customData?: any) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/webhooks/${webhookId}/test`,
      {
        eventType,
        testData: customData
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`✅ Test webhook queued: ${eventType}`);
    console.log(`   Delivery ID: ${response.data.deliveryId}`);

    return response.data.deliveryId;
  } catch (error: any) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    throw error;
  }
}

async function checkDeliveryStatus(deliveryId: string) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/webhooks/deliveries/${deliveryId}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    const delivery = response.data.delivery;
    console.log('\n📋 Delivery Status:');
    console.log(`   Status: ${delivery.status}`);
    console.log(`   Attempts: ${delivery.attempt}`);
    if (delivery.response) {
      console.log(`   Response Code: ${delivery.response.statusCode}`);
      console.log(`   Response Time: ${delivery.response.time}ms`);
    }
    if (delivery.error) {
      console.log(`   Error: ${delivery.error.message}`);
    }

    return delivery;
  } catch (error: any) {
    console.error('❌ Failed to check status:', error.response?.data || error.message);
    throw error;
  }
}

async function replayFailedDelivery(deliveryId: string) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/webhooks/deliveries/${deliveryId}/replay`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    console.log('✅ Delivery replayed');
    console.log(`   New Delivery ID: ${response.data.deliveryId}`);

    return response.data.deliveryId;
  } catch (error: any) {
    console.error('❌ Replay failed:', error.response?.data || error.message);
    throw error;
  }
}

async function main() {
  if (!API_KEY) {
    console.error('❌ COST_KATANA_API_KEY required');
    process.exit(1);
  }

  console.log('🥷 Webhook Testing Example\n');

  try {
    // Create test webhook
    const webhook = await axios.post(
      `${API_BASE_URL}/webhooks`,
      {
        name: 'Test Webhook',
        url: 'https://webhook.site/unique-url', // Use webhook.site for testing
        events: ['cost.alert'],
        active: true
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const webhookId = webhook.data.webhook.id;

    // Test it
    console.log('1️⃣ Testing webhook...');
    const deliveryId = await testWebhook(webhookId, 'cost.alert', {
      cost: { amount: 100, threshold: 75 }
    });

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check status
    console.log('\n2️⃣ Checking delivery status...');
    await checkDeliveryStatus(deliveryId);

    console.log('\n✅ Webhook testing complete!');
  } catch (error) {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { testWebhook, checkDeliveryStatus, replayFailedDelivery };
