/**
 * Cost Katana Workflows: Pause, Resume, Cancel
 * 
 * Control workflow execution in real-time.
 * 
 * Run: npx ts-node 17-workflows/npm-package/workflow-control.ts
 */

import axios from 'axios';
import { executeWorkflow, getExecutionStatus } from './create-workflow';

const API_BASE = 'https://cost-katana-backend.store/api';
const API_KEY = process.env.COST_KATANA_API_KEY;

async function pauseWorkflow(executionId: string) {
  try {
    const response = await axios.post(
      `${API_BASE}/workflows/executions/${executionId}/pause`,
      {},
      {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      }
    );

    console.log('⏸️  Workflow paused');
    return response.data.data;
  } catch (error: any) {
    console.error('❌ Failed to pause:', error.response?.data || error.message);
    throw error;
  }
}

async function resumeWorkflow(executionId: string) {
  try {
    const response = await axios.post(
      `${API_BASE}/workflows/executions/${executionId}/resume`,
      {},
      {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      }
    );

    console.log('▶️  Workflow resumed');
    return response.data.data;
  } catch (error: any) {
    console.error('❌ Failed to resume:', error.response?.data || error.message);
    throw error;
  }
}

async function cancelWorkflow(executionId: string) {
  try {
    const response = await axios.post(
      `${API_BASE}/workflows/executions/${executionId}/cancel`,
      {},
      {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      }
    );

    console.log('⛔ Workflow cancelled');
    return response.data.data;
  } catch (error: any) {
    console.error('❌ Failed to cancel:', error.response?.data || error.message);
    throw error;
  }
}

async function workflowControlDemo() {
  console.log('🥷 Workflow Control Demo\n');

  // This would need a long-running workflow to demonstrate
  console.log('💡 Workflow Control Operations:');
  console.log('\n   Pause:');
  console.log('   - Pauses after current step completes');
  console.log('   - State is preserved');
  console.log('   - Can be resumed later');
  
  console.log('\n   Resume:');
  console.log('   - Continues from paused state');
  console.log('   - All context preserved');
  console.log('   - No data loss');
  
  console.log('\n   Cancel:');
  console.log('   - Stops execution immediately');
  console.log('   - Partial results saved');
  console.log('   - Cannot be resumed');

  console.log('\n📝 Example usage:');
  console.log(`
  // Start long-running workflow
  const execution = await executeWorkflow(templateId, variables);
  
  // Pause if needed
  await pauseWorkflow(execution.executionId);
  
  // Resume when ready
  await resumeWorkflow(execution.executionId);
  
  // Or cancel if no longer needed
  await cancelWorkflow(execution.executionId);
  `);
}

async function main() {
  if (!API_KEY) {
    console.error('❌ COST_KATANA_API_KEY required');
    process.exit(1);
  }

  await workflowControlDemo();
}

if (require.main === module) {
  main();
}

export { pauseWorkflow, resumeWorkflow, cancelWorkflow };
