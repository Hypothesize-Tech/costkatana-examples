/**
 * Cost Katana Workflows: Create and Execute Workflows
 * 
 * Orchestrate multi-step AI operations with automatic dependency
 * management, retries, and error handling.
 * 
 * Run: npx ts-node 17-workflows/npm-package/create-workflow.ts
 */

import axios from 'axios';

const API_BASE = 'https://api.costkatana.com/api';
const API_KEY = process.env.COST_KATANA_API_KEY;

interface WorkflowStep {
  id: string;
  name: string;
  type: 'ai' | 'function' | 'condition';
  model?: string;
  prompt?: string;
  dependsOn?: string[];
  output: string;
  parallel?: boolean;
}

interface WorkflowTemplate {
  name: string;
  description: string;
  steps: WorkflowStep[];
  variables: Array<{
    name: string;
    type: string;
    required: boolean;
    description?: string;
  }>;
  config?: {
    maxRetries?: number;
    retryDelay?: number;
    timeout?: number;
    failureHandling?: 'stop' | 'continue';
  };
}

/**
 * Create a workflow template
 */
async function createWorkflowTemplate(template: WorkflowTemplate) {
  try {
    const response = await axios.post(
      `${API_BASE}/workflows/templates`,
      template,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Workflow template created:');
    console.log(`   ID: ${response.data.data.id}`);
    console.log(`   Name: ${response.data.data.name}`);
    console.log(`   Steps: ${response.data.data.steps.length}`);

    return response.data.data;
  } catch (error: any) {
    console.error('❌ Failed to create template:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Execute a workflow
 */
async function executeWorkflow(templateId: string, variables: Record<string, any>) {
  try {
    const response = await axios.post(
      `${API_BASE}/workflows/templates/${templateId}/execute`,
      { variables },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Workflow execution started:');
    console.log(`   Execution ID: ${response.data.data.executionId}`);
    console.log(`   Status: ${response.data.data.status}`);

    return response.data.data;
  } catch (error: any) {
    console.error('❌ Failed to execute workflow:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Get workflow execution status
 */
async function getExecutionStatus(executionId: string) {
  try {
    const response = await axios.get(
      `${API_BASE}/workflows/executions/${executionId}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    return response.data.data;
  } catch (error: any) {
    console.error('❌ Failed to get execution status:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Wait for workflow to complete
 */
async function waitForCompletion(executionId: string, maxWaitTime = 60000): Promise<any> {
  const startTime = Date.now();
  const pollInterval = 2000;

  while (Date.now() - startTime < maxWaitTime) {
    const status = await getExecutionStatus(executionId);

    if (status.status === 'completed') {
      console.log('\n✅ Workflow completed successfully!');
      return status;
    }

    if (status.status === 'failed') {
      console.log('\n❌ Workflow failed');
      return status;
    }

    console.log(`⏳ Status: ${status.status}... (${Math.round((Date.now() - startTime) / 1000)}s)`);
    await new Promise(resolve => setTimeout(resolve, pollInterval));
  }

  throw new Error('Workflow execution timeout');
}

/**
 * Display workflow results
 */
function displayResults(execution: any) {
  console.log('\n📊 Workflow Results:');
  console.log(`   Duration: ${execution.duration}ms`);
  console.log(`   Total Cost: $${execution.totalCost?.toFixed(4)}`);
  console.log(`   Status: ${execution.status}`);

  console.log('\n   Steps:');
  execution.steps?.forEach((step: any, index: number) => {
    console.log(`   ${index + 1}. ${step.name}`);
    console.log(`      Status: ${step.status}`);
    console.log(`      Duration: ${step.duration}ms`);
    console.log(`      Cost: $${step.cost?.toFixed(4)}`);
    if (step.output) {
      const outputPreview = typeof step.output === 'string' 
        ? step.output.substring(0, 100) 
        : JSON.stringify(step.output).substring(0, 100);
      console.log(`      Output: ${outputPreview}...`);
    }
  });

  if (execution.outputs) {
    console.log('\n   Final Outputs:');
    Object.entries(execution.outputs).forEach(([key, value]) => {
      console.log(`   ${key}: ${typeof value === 'string' ? value.substring(0, 100) : JSON.stringify(value).substring(0, 100)}...`);
    });
  }
}

/**
 * Example: Document Analysis Workflow
 */
async function documentAnalysisExample() {
  console.log('🥷 Cost Katana Workflows: Document Analysis\n');

  // 1. Create workflow template
  console.log('1️⃣ Creating workflow template...');
  const template: WorkflowTemplate = {
    name: 'Document Analysis Workflow',
    description: 'Extract, analyze, and summarize documents',
    steps: [
      {
        id: 'step_1',
        name: 'extract_text',
        type: 'ai',
        model: 'gpt-4',
        prompt: 'Extract all important information from this document: {{document}}',
        output: 'extracted_text'
      },
      {
        id: 'step_2',
        name: 'extract_entities',
        type: 'ai',
        model: 'gpt-4',
        prompt: 'From this text, extract all entities (people, organizations, locations, dates): {{extracted_text}}',
        dependsOn: ['step_1'],
        output: 'entities'
      },
      {
        id: 'step_3',
        name: 'summarize',
        type: 'ai',
        model: 'gpt-3.5-turbo',
        prompt: 'Create a concise summary of this text: {{extracted_text}}',
        dependsOn: ['step_1'],
        output: 'summary'
      }
    ],
    variables: [
      {
        name: 'document',
        type: 'string',
        required: true,
        description: 'The document content to analyze'
      }
    ],
    config: {
      maxRetries: 3,
      retryDelay: 1000,
      timeout: 60000,
      failureHandling: 'continue'
    }
  };

  const createdTemplate = await createWorkflowTemplate(template);

  // 2. Execute workflow
  console.log('\n2️⃣ Executing workflow...');
  const execution = await executeWorkflow(createdTemplate.id, {
    document: 'John Smith works at Acme Corporation in New York. The company was founded in 1990 and specializes in technology solutions. John has been with the company for 5 years and serves as the VP of Engineering.'
  });

  // 3. Wait for completion
  console.log('\n3️⃣ Waiting for workflow to complete...');
  const result = await waitForCompletion(execution.executionId);

  // 4. Display results
  displayResults(result);

  console.log('\n💡 Workflow Features Used:');
  console.log('   ✅ Multi-step orchestration');
  console.log('   ✅ Automatic dependency management');
  console.log('   ✅ Variable substitution');
  console.log('   ✅ Cost tracking per step');
  console.log('   ✅ Automatic retries');
}

/**
 * Main function
 */
async function main() {
  if (!API_KEY) {
    console.error('❌ COST_KATANA_API_KEY environment variable required');
    process.exit(1);
  }

  try {
    await documentAnalysisExample();

    console.log('\n✅ Workflow example complete!');
    console.log('\n📚 Next steps:');
    console.log('   - Try parallel execution (see parallel-workflows.ts)');
    console.log('   - Add conditional branching (see conditional-workflows.ts)');
    console.log('   - Implement error handling (see error-handling.ts)');

  } catch (error) {
    console.error('\n❌ Example failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export {
  createWorkflowTemplate,
  executeWorkflow,
  getExecutionStatus,
  waitForCompletion,
  displayResults
};

