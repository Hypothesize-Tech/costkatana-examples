/**
 * Cost Katana Webhooks: Security & Compliance Alerts
 * 
 * Monitor security events, PII detection, prompt injection attempts,
 * and compliance violations in real-time.
 * 
 * Run: npx ts-node 10-webhooks/npm-package/security-webhooks.ts
 */

import axios from 'axios';

const API_BASE_URL = 'https://cost-katana-backend.store/api';
const API_KEY = process.env.COST_KATANA_API_KEY;

async function setupSecurityWebhook(webhookUrl: string) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/webhooks`,
      {
        name: 'Security & Compliance Alerts',
        url: webhookUrl,
        events: [
          'security.alert',
          'compliance.violation',
          'data.privacy_alert',
          'moderation.blocked'
        ],
        description: 'Critical security and compliance monitoring',
        active: true,
        secret: process.env.WEBHOOK_SECRET || 'your_webhook_secret',
        filters: {
          severity: ['high', 'critical']
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Security webhook created');
    console.log(`   Webhook ID: ${response.data.webhook.id}`);
    console.log(`   Monitoring: ${response.data.webhook.events.join(', ')}`);
    
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

  console.log('🥷 Security Webhooks Example\n');

  try {
    const webhook = await setupSecurityWebhook('https://your-server.com/webhooks/security');

    console.log('\n💡 Security events monitored:');
    console.log('   • Prompt injection attempts');
    console.log('   • PII detected in requests');
    console.log('   • Compliance violations (GDPR, CCPA)');
    console.log('   • Content moderation blocks');
    console.log('\n✅ Security monitoring active!');

  } catch (error) {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { setupSecurityWebhook };
