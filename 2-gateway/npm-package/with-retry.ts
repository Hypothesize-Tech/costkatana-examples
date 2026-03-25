/**
 * Gateway Example: Automatic Retries
 * Handle rate limits and failures automatically
 */
import { gateway } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';

async function main() {
  console.log('\n🔄 Gateway Automatic Retry Example\n');

  validateConfig(['costKatanaKey']);

  const g = gateway({
    baseUrl: config.gatewayUrl,
    enableRetries: true,
    retryConfig: {
      count: 3,
      factor: 2,
      minTimeout: 1000,
      maxTimeout: 10000
    }
  });

  await g.openai({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Explain resilience patterns.' }]
  });

  console.log('✅ Request completed with automatic retry protection!\n');
}

main().catch(console.error);
