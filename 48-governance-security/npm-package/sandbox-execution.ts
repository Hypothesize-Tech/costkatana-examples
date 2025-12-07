/**
 * AI Governance & Security - Sandbox Execution
 * 
 * Demonstrates how to:
 * - Execute agents in isolated sandboxes
 * - Monitor resource usage
 * - Handle sandbox violations
 */

import { CostKatana } from 'cost-katana';

const client = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!,
});

async function main() {
  try {
    console.log('📦 AI Governance & Security - Sandbox Execution\n');

    // 1. Execute agent in sandbox
    console.log('🚀 Executing agent in sandbox...');
    const execution = await client.governance.executeSandboxed({
      agentToken: process.env.AGENT_TOKEN!,
      
      // Execution request
      model: 'gpt-4-turbo',
      messages: [
        { role: 'user', content: 'Analyze this customer feedback: "Great product!"' },
      ],
      
      // Sandbox overrides (optional, uses agent defaults if not provided)
      sandboxConfig: {
        maxCpuCores: 0.5,
        maxMemoryMB: 512,
        maxExecutionTimeSeconds: 60,
        isolationLevel: 'container',
      },
      
      // Monitoring
      enableMonitoring: true,
      captureMetrics: true,
    });

    console.log('\n✅ Execution completed successfully!');
    console.log(`\n📊 Response:`);
    console.log(execution.response.text);

    // 2. View execution metrics
    console.log('\n📈 Execution Metrics:');
    console.log(`Duration: ${execution.metrics.durationMs}ms`);
    console.log(`CPU Usage: ${execution.metrics.cpuUsagePercent}%`);
    console.log(`Memory Used: ${execution.metrics.memoryUsedMB}MB`);
    console.log(`Disk I/O: ${execution.metrics.diskIOBytes} bytes`);
    console.log(`Network Calls: ${execution.metrics.networkCalls}`);
    console.log(`Cost: $${execution.metrics.cost.toFixed(6)}`);

    // 3. Check for violations
    if (execution.violations && execution.violations.length > 0) {
      console.log('\n⚠️  Sandbox Violations Detected:');
      execution.violations.forEach((violation, index) => {
        console.log(`\n${index + 1}. ${violation.type}`);
        console.log(`   Severity: ${violation.severity}`);
        console.log(`   Description: ${violation.description}`);
        console.log(`   Action Taken: ${violation.actionTaken}`);
      });
    } else {
      console.log('\n✅ No sandbox violations');
    }

    // 4. Get sandbox statistics
    console.log('\n📊 Sandbox Statistics (24h):');
    const stats = await client.governance.getSandboxStatistics({
      agentId: execution.agentId,
      timeRange: '24h',
    });

    console.log(`Total Executions: ${stats.totalExecutions}`);
    console.log(`Successful: ${stats.successful} (${stats.successRate}%)`);
    console.log(`Violations: ${stats.violations} (${stats.violationRate}%)`);
    console.log(`Avg CPU Usage: ${stats.avgCpuUsage}%`);
    console.log(`Avg Memory Usage: ${stats.avgMemoryUsage}MB`);
    console.log(`Avg Duration: ${stats.avgDuration}ms`);

    console.log('\n📋 Violation Breakdown:');
    Object.entries(stats.violationsByType).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });

    console.log('\n✅ Sandbox execution example completed!');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

