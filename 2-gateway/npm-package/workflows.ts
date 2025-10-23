/**
 * Gateway Example: Workflow Tracking
 */
import { AICostTracker, AIProvider } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';

async function main() {
  console.log('\n📊 Gateway Workflow Tracking Example\n');
  
  validateConfig();
  
  const tracker = await AICostTracker.create({
    providers: [{ provider: AIProvider.OpenAI, apiKey: config.openaiKey }],
    projectId: config.projectId,
  });
  
  const gateway = tracker.initializeGateway();
  const workflowId = `workflow_${Date.now()}`;
  
  // Step 1
  await gateway.openai({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Generate outline' }]
  }, {
    workflowId,
    workflowName: 'content-generation',
    workflowStep: 'outline'
  });
  
  // Step 2
  await gateway.openai({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Write content' }]
  }, {
    workflowId,
    workflowName: 'content-generation',
    workflowStep: 'content'
  });
  
  console.log('✅ Workflow tracked end-to-end!\n');
  console.log(`View workflow at: https://costkatana.com/workflows/${workflowId}\n`);
}

main().catch(console.error);
