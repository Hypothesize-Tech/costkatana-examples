/**
 * Cost Katana Webhooks: Cost & Budget Alerts
 * 
 * This example demonstrates setting up webhooks for cost alerts,
 * budget warnings, and cost anomaly detection.
 * 
 * Setup:
 * 1. Set COST_KATANA_API_KEY environment variable
 * 2. Run: npx ts-node 10-webhooks/npm-package/cost-alerts.ts
 */

import axios from 'axios';

const API_BASE_URL = 'https://api.costkatana.com/api';
const API_KEY = process.env.COST_KATANA_API_KEY;

/**
 * Create webhook for all cost-related alerts
 */
async function setupCostAlertsWebhook(webhookUrl: string) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/webhooks`,
      {
        name: 'Comprehensive Cost Alerts',
        url: webhookUrl,
        events: [
          // Cost alerts
          'cost.alert',
          'cost.threshold_exceeded',
          'cost.spike_detected',
          'cost.anomaly_detected',
          
          // Budget alerts
          'budget.warning',
          'budget.exceeded',
          
          // Savings opportunities
          'optimization.suggested',
          'savings.milestone_reached'
        ],
        description: 'Monitor all cost and budget events',
        active: true,
        secret: process.env.WEBHOOK_SECRET || 'your_webhook_secret',
        filters: {
          severity: ['medium', 'high', 'critical']
        },
        retryConfig: {
          maxRetries: 5,
          backoffMultiplier: 2,
          initialDelay: 3000
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Cost alerts webhook created successfully');
    console.log(`   Webhook ID: ${response.data.webhook.id}`);
    console.log(`   Monitoring ${response.data.webhook.events.length} event types`);
    
    return response.data.webhook;
  } catch (error: any) {
    console.error('❌ Failed to create cost alerts webhook:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Example webhook handler (what you'd implement on your server)
 * 
 * This shows what your webhook receiver should look like
 */
function exampleWebhookHandler() {
  console.log('\n📝 Example Webhook Handler (implement this on your server):\n');
  console.log(`
import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json());

// Webhook receiver endpoint
app.post('/webhooks/cost-alerts', (req, res) => {
  // 1. Verify webhook signature
  const signature = req.headers['x-costkatana-signature'];
  const isValid = verifySignature(req.body, signature);
  
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // 2. Process the webhook event
  const event = req.body;
  
  console.log(\`Received event: \${event.event_type}\`);
  console.log(\`Severity: \${event.data.severity}\`);
  console.log(\`Title: \${event.data.title}\`);
  
  switch (event.event_type) {
    case 'cost.alert':
      handleCostAlert(event);
      break;
    
    case 'budget.exceeded':
      handleBudgetExceeded(event);
      break;
    
    case 'cost.anomaly_detected':
      handleCostAnomaly(event);
      break;
    
    default:
      console.log('Unhandled event type');
  }

  // 3. Respond with 200 OK
  res.status(200).json({ received: true });
});

function verifySignature(payload, signature) {
  const [t, v1] = signature.split(',').map(x => x.split('=')[1]);
  const signedPayload = \`\${t}.\${JSON.stringify(payload)}\`;
  
  const expectedSignature = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(signedPayload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(v1),
    Buffer.from(expectedSignature)
  );
}

function handleCostAlert(event) {
  const cost = event.data.cost;
  console.log(\`💰 Cost Alert: Current \$\${cost.amount} exceeds threshold \$\${cost.threshold}\`);
  
  // Send notification to team
  sendSlackAlert({
    title: event.data.title,
    message: event.data.description,
    severity: event.data.severity,
    dashboardLink: event.data.links.dashboard
  });
}

function handleBudgetExceeded(event) {
  const budget = event.data.budget;
  console.log(\`⚠️ Budget Exceeded: \${budget.percentUsed}% of \$\${budget.limit}\`);
  
  // Take action - maybe throttle requests or send urgent alert
  if (budget.percentUsed > 150) {
    triggerEmergencyThrottling();
  }
  
  sendEmailAlert({
    to: 'finance@company.com',
    subject: 'URGENT: Monthly Budget Exceeded',
    body: event.data.description
  });
}

function handleCostAnomaly(event) {
  const anomaly = event.data.anomaly;
  console.log(\`🔍 Cost Anomaly: \${anomaly.type} detected with \${anomaly.confidence}% confidence\`);
  
  // Investigate and alert
  sendPagerDutyAlert({
    title: 'Cost Anomaly Detected',
    description: event.data.description,
    severity: 'high',
    dedup_key: event.event_id
  });
}

app.listen(3000, () => {
  console.log('Webhook receiver listening on port 3000');
});
  `);
}

/**
 * Test the webhook with sample data
 */
async function testCostAlertWebhook(webhookId: string) {
  try {
    // Test with cost alert
    await axios.post(
      `${API_BASE_URL}/webhooks/${webhookId}/test`,
      {
        eventType: 'cost.alert',
        testData: {
          cost: {
            amount: 156.75,
            currency: 'USD',
            threshold: 100.00,
            excess: 56.75
          },
          metrics: {
            current: 156.75,
            threshold: 100.00,
            changePercentage: 56.75
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

    console.log('✅ Test webhook sent for cost.alert');

    // Test with budget exceeded
    await axios.post(
      `${API_BASE_URL}/webhooks/${webhookId}/test`,
      {
        eventType: 'budget.exceeded',
        testData: {
          budget: {
            id: 'budget_123',
            limit: 1000.00,
            spent: 1125.50,
            percentUsed: 112.5
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

    console.log('✅ Test webhook sent for budget.exceeded');

  } catch (error: any) {
    console.error('❌ Failed to test webhook:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Get webhook deliveries to see what was sent
 */
async function getWebhookDeliveries(webhookId: string) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/webhooks/${webhookId}/deliveries?limit=10`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    console.log(`\n📬 Recent deliveries (${response.data.deliveries.length}):`);
    
    response.data.deliveries.forEach((delivery: any, index: number) => {
      console.log(`\n   ${index + 1}. ${delivery.eventType}`);
      console.log(`      Status: ${delivery.status}`);
      console.log(`      Attempt: ${delivery.attempt}`);
      if (delivery.response) {
        console.log(`      Response Code: ${delivery.response.statusCode}`);
        console.log(`      Response Time: ${delivery.response.time}ms`);
      }
      if (delivery.error) {
        console.log(`      Error: ${delivery.error.message}`);
      }
    });

    return response.data.deliveries;
  } catch (error: any) {
    console.error('❌ Failed to get deliveries:', error.response?.data || error.message);
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

  console.log('🥷 Cost Katana - Cost Alerts Webhook Example\n');

  try {
    // 1. Set up the webhook
    console.log('1️⃣ Setting up cost alerts webhook...');
    const webhook = await setupCostAlertsWebhook('https://your-server.com/webhooks/cost-alerts');

    // 2. Show example webhook handler
    exampleWebhookHandler();

    // 3. Test the webhook
    console.log('\n2️⃣ Testing webhook with sample events...');
    await testCostAlertWebhook(webhook.id);

    // 4. Check webhook deliveries
    console.log('\n3️⃣ Checking webhook deliveries...');
    await getWebhookDeliveries(webhook.id);

    console.log('\n✅ Cost alerts webhook setup complete!');
    console.log('\n💡 What happens next:');
    console.log('   1. When your costs exceed thresholds, webhook fires automatically');
    console.log('   2. When budget limits are hit, you get instant notifications');
    console.log('   3. Cost anomalies trigger investigation alerts');
    console.log('   4. View all webhook activity in the dashboard\n');

    console.log('💰 Cost savings potential:');
    console.log('   - Get alerted before costs spiral out of control');
    console.log('   - Catch budget overruns in real-time');
    console.log('   - Detect unusual spending patterns early');

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
  setupCostAlertsWebhook,
  testCostAlertWebhook,
  getWebhookDeliveries
};

