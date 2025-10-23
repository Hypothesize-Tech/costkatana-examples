/**
 * Cost Katana Webhooks: Create and Manage Webhooks
 * 
 * This example demonstrates how to create and manage webhooks
 * to receive real-time notifications for cost and system events.
 * 
 * Setup:
 * 1. Set COST_KATANA_API_KEY environment variable
 * 2. Run: npx ts-node 10-webhooks/npm-package/create-webhook.ts
 */

import axios from 'axios';

const API_BASE_URL = 'https://cost-katana-backend.store/api';
const API_KEY = process.env.COST_KATANA_API_KEY;

interface WebhookConfig {
  name: string;
  url: string;
  events: string[];
  description?: string;
  active?: boolean;
  secret?: string;
  filters?: {
    severity?: string[];
    models?: string[];
  };
  retryConfig?: {
    maxRetries: number;
    backoffMultiplier: number;
    initialDelay: number;
  };
}

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  active: boolean;
  secret?: string;
  createdAt: string;
  retryConfig?: {
    maxRetries: number;
    backoffMultiplier: number;
    initialDelay: number;
  };
}

/**
 * Create a new webhook
 */
async function createWebhook(config: WebhookConfig): Promise<Webhook> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/webhooks`,
      config,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Webhook created successfully:');
    console.log(`   ID: ${response.data.webhook.id}`);
    console.log(`   Name: ${response.data.webhook.name}`);
    console.log(`   URL: ${response.data.webhook.url}`);
    console.log(`   Events: ${response.data.webhook.events.length} events`);
    console.log(`   Active: ${response.data.webhook.active}`);

    return response.data.webhook;
  } catch (error: any) {
    console.error('❌ Failed to create webhook:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * List all webhooks
 */
async function listWebhooks(filters?: { active?: boolean; events?: string[] }): Promise<Webhook[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.active !== undefined) {
      params.append('active', filters.active.toString());
    }
    if (filters?.events) {
      filters.events.forEach(event => params.append('events', event));
    }

    const response = await axios.get(
      `${API_BASE_URL}/webhooks?${params.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    console.log(`\n📋 Found ${response.data.webhooks.length} webhooks:`);
    response.data.webhooks.forEach((webhook: Webhook, index: number) => {
      console.log(`\n   ${index + 1}. ${webhook.name}`);
      console.log(`      ID: ${webhook.id}`);
      console.log(`      URL: ${webhook.url}`);
      console.log(`      Events: ${webhook.events.length}`);
      console.log(`      Active: ${webhook.active}`);
    });

    return response.data.webhooks;
  } catch (error: any) {
    console.error('❌ Failed to list webhooks:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Get a specific webhook
 */
async function getWebhook(webhookId: string): Promise<Webhook> {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/webhooks/${webhookId}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    console.log('\n📄 Webhook details:');
    console.log(`   ID: ${response.data.webhook.id}`);
    console.log(`   Name: ${response.data.webhook.name}`);
    console.log(`   URL: ${response.data.webhook.url}`);
    console.log(`   Events: ${response.data.webhook.events.join(', ')}`);
    console.log(`   Active: ${response.data.webhook.active}`);
    console.log(`   Retry Config:`, response.data.webhook.retryConfig);

    return response.data.webhook;
  } catch (error: any) {
    console.error('❌ Failed to get webhook:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Update a webhook
 */
async function updateWebhook(webhookId: string, updates: Partial<WebhookConfig>): Promise<Webhook> {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/webhooks/${webhookId}`,
      updates,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Webhook updated successfully');
    return response.data.webhook;
  } catch (error: any) {
    console.error('❌ Failed to update webhook:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Delete a webhook
 */
async function deleteWebhook(webhookId: string): Promise<void> {
  try {
    await axios.delete(
      `${API_BASE_URL}/webhooks/${webhookId}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    console.log('✅ Webhook deleted successfully');
  } catch (error: any) {
    console.error('❌ Failed to delete webhook:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Test a webhook
 */
async function testWebhook(webhookId: string, testData?: any): Promise<void> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/webhooks/${webhookId}/test`,
      testData || {
        eventType: 'cost.alert',
        testData: {
          cost: {
            amount: 125.50,
            threshold: 100.00
          }
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Test webhook queued for delivery');
    console.log(`   Delivery ID: ${response.data.deliveryId}`);
  } catch (error: any) {
    console.error('❌ Failed to test webhook:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Get webhook statistics
 */
async function getWebhookStats(webhookId: string): Promise<any> {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/webhooks/${webhookId}/stats`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    console.log('\n📊 Webhook Statistics:');
    console.log(`   Total Deliveries: ${response.data.stats.totalDeliveries || 0}`);
    console.log(`   Successful: ${response.data.stats.successfulDeliveries || 0}`);
    console.log(`   Failed: ${response.data.stats.failedDeliveries || 0}`);
    console.log(`   Success Rate: ${response.data.stats.successRate || 0}%`);

    return response.data.stats;
  } catch (error: any) {
    console.error('❌ Failed to get stats:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Main example
 */
async function main() {
  if (!API_KEY) {
    console.error('❌ COST_KATANA_API_KEY environment variable is required');
    process.exit(1);
  }

  console.log('🥷 Cost Katana Webhooks Example\n');

  try {
    // 1. Create a webhook for cost alerts
    console.log('1️⃣ Creating webhook for cost alerts...');
    const webhook = await createWebhook({
      name: 'Cost Alerts Webhook',
      url: 'https://your-server.com/webhooks/cost-alerts',
      events: [
        'cost.alert',
        'cost.threshold_exceeded',
        'budget.warning',
        'budget.exceeded'
      ],
      description: 'Receive notifications when costs exceed thresholds',
      active: true,
      secret: 'your_webhook_secret_key',
      retryConfig: {
        maxRetries: 3,
        backoffMultiplier: 2,
        initialDelay: 5000
      }
    });

    const webhookId = webhook.id;

    // 2. List all webhooks
    console.log('\n2️⃣ Listing all webhooks...');
    await listWebhooks();

    // 3. Get webhook details
    console.log('\n3️⃣ Getting webhook details...');
    await getWebhook(webhookId);

    // 4. Test the webhook
    console.log('\n4️⃣ Testing webhook...');
    await testWebhook(webhookId);

    // 5. Get webhook statistics
    console.log('\n5️⃣ Getting webhook statistics...');
    await getWebhookStats(webhookId);

    // 6. Update webhook (disable it)
    console.log('\n6️⃣ Updating webhook (disabling)...');
    await updateWebhook(webhookId, {
      active: false
    });

    // 7. Clean up - delete webhook
    console.log('\n7️⃣ Cleaning up (deleting webhook)...');
    await deleteWebhook(webhookId);

    console.log('\n✅ All webhook operations completed successfully!');
    console.log('\n💡 Next steps:');
    console.log('   - Set up a webhook receiver endpoint');
    console.log('   - Verify webhook signatures for security');
    console.log('   - Monitor webhook deliveries in dashboard');

  } catch (error) {
    console.error('\n❌ Example failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

// Export functions for use in other files
export {
  createWebhook,
  listWebhooks,
  getWebhook,
  updateWebhook,
  deleteWebhook,
  testWebhook,
  getWebhookStats
};

