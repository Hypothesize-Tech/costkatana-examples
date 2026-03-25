/**
 * Gateway Example: Workflow / trace grouping (legacy workflow headers)
 */
import { gateway } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';

async function main() {
  console.log('\n📊 Gateway Workflow Tracking Example\n');

  validateConfig(['costKatanaKey']);

  const g = gateway({ baseUrl: config.gatewayUrl });
  const workflowId = `workflow_${Date.now()}`;

  await g.openai(
    {
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'Generate outline' }]
    },
    {
      workflow: {
        workflowId,
        workflowName: 'content-generation',
        workflowStep: 'outline'
      }
    }
  );

  await g.openai(
    {
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'Write content' }]
    },
    {
      workflow: {
        workflowId,
        workflowName: 'content-generation',
        workflowStep: 'content'
      }
    }
  );

  console.log('✅ Workflow / trace headers sent for both steps!\n');
  console.log(`Trace/workflow id: ${workflowId}\n`);
}

main().catch(console.error);
