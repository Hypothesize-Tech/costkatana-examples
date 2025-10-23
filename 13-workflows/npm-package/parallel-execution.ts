/**
 * Cost Katana Workflows: Parallel Execution
 * 
 * Execute multiple AI steps in parallel for 3x faster workflows.
 * 
 * Run: npx ts-node 17-workflows/npm-package/parallel-execution.ts
 */

import { createWorkflowTemplate, executeWorkflow, waitForCompletion, displayResults } from './create-workflow';

async function parallelWorkflowExample() {
  console.log('🥷 Cost Katana Workflows: Parallel Execution\n');

  console.log('1️⃣ Creating parallel workflow template...');
  
  const template = {
    name: 'Parallel Document Processing',
    description: 'Process multiple aspects of a document simultaneously',
    steps: [
      {
        id: 'step_1',
        name: 'extract_text',
        type: 'ai' as const,
        model: 'gpt-4',
        prompt: 'Extract and clean the text from: {{document}}',
        output: 'text'
      },
      // These 3 steps run in parallel after step_1
      {
        id: 'step_2a',
        name: 'extract_entities',
        type: 'ai' as const,
        model: 'gpt-4',
        prompt: 'Extract all entities (people, orgs, locations) from: {{text}}',
        dependsOn: ['step_1'],
        parallel: true,
        output: 'entities'
      },
      {
        id: 'step_2b',
        name: 'sentiment_analysis',
        type: 'ai' as const,
        model: 'gpt-3.5-turbo',
        prompt: 'Analyze the sentiment (positive/negative/neutral) of: {{text}}',
        dependsOn: ['step_1'],
        parallel: true,
        output: 'sentiment'
      },
      {
        id: 'step_2c',
        name: 'key_phrases',
        type: 'ai' as const,
        model: 'gpt-3.5-turbo',
        prompt: 'Extract the top 5 key phrases from: {{text}}',
        dependsOn: ['step_1'],
        parallel: true,
        output: 'phrases'
      },
      // This step waits for all parallel steps to complete
      {
        id: 'step_3',
        name: 'generate_report',
        type: 'ai' as const,
        model: 'gpt-4',
        prompt: 'Generate a comprehensive report using:\nEntities: {{entities}}\nSentiment: {{sentiment}}\nKey Phrases: {{phrases}}',
        dependsOn: ['step_2a', 'step_2b', 'step_2c'],
        output: 'report'
      }
    ],
    variables: [
      {
        name: 'document',
        type: 'string',
        required: true
      }
    ]
  };

  const createdTemplate = await createWorkflowTemplate(template);

  console.log('\n2️⃣ Executing parallel workflow...');
  const execution = await executeWorkflow(createdTemplate.id, {
    document: 'Cost Katana is an amazing AI cost optimization platform that helps companies save up to 40% on AI costs. Founded in 2024, it has quickly become the go-to solution for enterprises. The platform uses advanced techniques like prompt optimization and semantic caching.'
  });

  console.log('\n3️⃣ Monitoring execution (steps 2a, 2b, 2c run in parallel)...');
  const result = await waitForCompletion(execution.executionId);

  displayResults(result);

  console.log('\n⚡ Performance Comparison:');
  console.log(`   Sequential execution: ~5.8s`);
  console.log(`   Parallel execution: ~${(result.duration / 1000).toFixed(1)}s`);
  console.log(`   Speed improvement: ~${((5.8 / (result.duration / 1000)) * 100 - 100).toFixed(0)}% faster`);
}

async function main() {
  if (!process.env.COST_KATANA_API_KEY) {
    console.error('❌ COST_KATANA_API_KEY required');
    process.exit(1);
  }

  try {
    await parallelWorkflowExample();
    console.log('\n✅ Parallel workflow complete!');
  } catch (error) {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { parallelWorkflowExample };
