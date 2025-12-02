/**
 * Cost Katana Workflows: Monitoring & Analytics
 * 
 * Monitor workflow executions and analyze performance.
 * 
 * Run: npx ts-node 17-workflows/npm-package/workflow-monitoring.ts
 */

import axios from 'axios';

const API_BASE = 'https://api.costkatana.com/api';
const API_KEY = process.env.COST_KATANA_API_KEY;

async function listWorkflowExecutions(filters?: {
  status?: 'running' | 'completed' | 'failed' | 'paused';
  limit?: number;
  offset?: number;
}) {
  try {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());

    const response = await axios.get(
      `${API_BASE}/workflows/executions?${params.toString()}`,
      {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      }
    );

    console.log(`📋 Found ${response.data.data.executions?.length || 0} executions:`);
    
    response.data.data.executions?.forEach((exec: any, index: number) => {
      console.log(`\n   ${index + 1}. ${exec.workflowName || 'Workflow'}`);
      console.log(`      Execution ID: ${exec.executionId}`);
      console.log(`      Status: ${exec.status}`);
      console.log(`      Duration: ${exec.duration}ms`);
      console.log(`      Cost: $${exec.totalCost?.toFixed(4)}`);
      console.log(`      Started: ${new Date(exec.startedAt).toLocaleString()}`);
    });

    return response.data.data;
  } catch (error: any) {
    console.error('❌ Failed:', error.response?.data || error.message);
    throw error;
  }
}

async function getWorkflowAnalytics() {
  try {
    const response = await axios.get(
      `${API_BASE}/workflows/analytics`,
      {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      }
    );

    const analytics = response.data.data;

    console.log('\n📊 Workflow Analytics:');
    console.log(`   Total Executions: ${analytics.totalExecutions}`);
    console.log(`   Completed: ${analytics.completedExecutions}`);
    console.log(`   Failed: ${analytics.failedExecutions}`);
    console.log(`   Running: ${analytics.runningExecutions}`);
    console.log(`   Success Rate: ${(analytics.successRate * 100).toFixed(1)}%`);
    console.log(`   Avg Duration: ${analytics.averageDuration}ms`);
    console.log(`   Total Cost: $${analytics.totalCost?.toFixed(2)}`);
    console.log(`   Avg Cost: $${analytics.averageCost?.toFixed(4)}`);

    if (analytics.topWorkflows?.length > 0) {
      console.log('\n   Top Workflows:');
      analytics.topWorkflows.forEach((wf: any, index: number) => {
        console.log(`   ${index + 1}. ${wf.name}`);
        console.log(`      Executions: ${wf.executions}`);
        console.log(`      Success Rate: ${(wf.successRate * 100).toFixed(1)}%`);
      });
    }

    return analytics;
  } catch (error: any) {
    console.error('❌ Failed:', error.response?.data || error.message);
    throw error;
  }
}

async function getWorkflowTrace(executionId: string) {
  try {
    const response = await axios.get(
      `${API_BASE}/workflows/executions/${executionId}/trace`,
      {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      }
    );

    console.log(`\n🔍 Workflow Trace: ${executionId}`);
    
    const trace = response.data.data;
    
    trace.steps?.forEach((step: any) => {
      console.log(`\n   Step: ${step.name}`);
      console.log(`   Trace ID: ${step.traceId}`);
      console.log(`   Duration: ${step.duration}ms`);
      console.log(`   Tokens: ${step.tokens?.total || 0}`);
      console.log(`   Cost: $${step.cost?.toFixed(4)}`);
    });

    return trace;
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

  console.log('🥷 Workflow Monitoring & Analytics\n');

  try {
    // 1. View recent executions
    console.log('1️⃣ Recent workflow executions:');
    await listWorkflowExecutions({ limit: 5 });

    // 2. Get analytics
    console.log('\n2️⃣ Fetching workflow analytics...');
    await getWorkflowAnalytics();

    console.log('\n✅ Monitoring complete!');
  } catch (error) {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { listWorkflowExecutions, getWorkflowAnalytics, getWorkflowTrace };
