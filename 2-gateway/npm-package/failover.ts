/**
 * Gateway Example: Failover (when configured on the gateway)
 */
import { gateway } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';

async function main() {
  console.log('\n🔀 Gateway Failover Example\n');

  validateConfig(['costKatanaKey']);

  const g = gateway({ baseUrl: config.gatewayUrl });

  // Enable gateway failover handling for this request (uses server/default policy when true)
  await g.openai(
    {
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'Test failover' }]
    },
    { failover: true }
  );

  console.log('✅ Request completed with failover option enabled!\n');
}

main().catch(console.error);
