/**
 * AI Governance & Security - Create Governed Agent
 * 
 * Demonstrates how to:
 * - Create an AI agent with governance controls
 * - Configure RBAC permissions
 * - Set budget and rate limits
 * - Enable sandbox execution
 */

import { CostKatana } from 'cost-katana';

const client = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!,
});

async function main() {
  try {
    console.log('🛡️ AI Governance & Security - Create Agent\n');

    // 1. Create a governed AI agent
    console.log('👤 Creating governed AI agent...');
    const agent = await client.governance.createAgent({
      agentName: 'customer-support-bot',
      agentType: 'multiagent',
      
      // Authentication
      tokenPrefix: 'ck-agent-support',
      
      // Authorization (RBAC)
      allowedModels: [
        'gpt-4-turbo',
        'gpt-3.5-turbo',
        'claude-3-sonnet',
        'claude-3-haiku',
      ],
      allowedProviders: ['openai', 'anthropic'],
      allowedActions: ['read', 'write', 'execute'],
      
      // Capabilities
      capabilities: [
        {
          name: 'text-generation',
          maxInputTokens: 4000,
          maxOutputTokens: 2000,
          allowedContentTypes: ['text/plain', 'application/json'],
        },
        {
          name: 'conversation',
          maxInputTokens: 8000,
          maxOutputTokens: 4000,
          allowedContentTypes: ['text/plain'],
        },
      ],
      
      // Resource constraints
      budgetCapPerRequest: 0.25, // Max $0.25 per request
      budgetCapPerDay: 10.00, // Max $10 per day
      budgetCapPerMonth: 200.00, // Max $200 per month
      
      // Rate limiting
      maxRequestsPerMinute: 20,
      maxRequestsPerHour: 500,
      maxConcurrentExecutions: 5,
      
      // Sandbox requirements
      sandboxRequired: true,
      sandboxConfig: {
        maxCpuCores: 0.5,
        maxMemoryMB: 512,
        maxDiskMB: 100,
        maxExecutionTimeSeconds: 300,
        allowedNetworkEndpoints: [
          'api.openai.com',
          'api.anthropic.com',
        ],
        isolationLevel: 'container',
      },
      
      // Security settings
      requireMfa: false,
      auditLevel: 'comprehensive',
      
      // Metadata
      description: 'Customer support chatbot agent',
      tags: ['production', 'customer-facing'],
    });

    console.log('\n✅ Agent created successfully!');
    console.log(`Agent ID: ${agent.agentId}`);
    console.log(`Agent Token: ${agent.agentToken}`);
    console.log('⚠️  Store the agent token securely - it will not be shown again!\n');

    // 2. Verify agent permissions
    console.log('🔍 Verifying agent permissions...');
    const permissions = await client.governance.getAgentPermissions(agent.agentId);
    
    console.log('\n📋 Agent Permissions:');
    console.log(`Models: ${permissions.allowedModels.join(', ')}`);
    console.log(`Providers: ${permissions.allowedProviders.join(', ')}`);
    console.log(`Actions: ${permissions.allowedActions.join(', ')}`);
    console.log(`Budget Cap (Request): $${permissions.budgetCapPerRequest}`);
    console.log(`Budget Cap (Day): $${permissions.budgetCapPerDay}`);
    console.log(`Budget Cap (Month): $${permissions.budgetCapPerMonth}`);

    // 3. Test agent authentication
    console.log('\n🔐 Testing agent authentication...');
    const authResult = await client.governance.authenticateAgent(agent.agentToken);
    
    console.log(`Authentication: ${authResult.valid ? '✅ Valid' : '❌ Invalid'}`);
    console.log(`Agent Name: ${authResult.agentName}`);
    console.log(`Agent Type: ${authResult.agentType}`);

    // 4. Perform governance check
    console.log('\n🔍 Performing governance check...');
    const governanceCheck = await client.governance.performCheck({
      agentToken: agent.agentToken,
      action: 'execute',
      resource: {
        model: 'gpt-4-turbo',
        provider: 'openai',
        capability: 'text-generation',
      },
      estimatedCost: 0.05,
    });

    console.log(`\n📊 Governance Check Result:`);
    console.log(`Allowed: ${governanceCheck.allowed ? '✅ Yes' : '❌ No'}`);
    
    if (!governanceCheck.allowed) {
      console.log(`Violations: ${governanceCheck.violations.join(', ')}`);
      console.log(`Reason: ${governanceCheck.reason}`);
    } else {
      console.log('All checks passed!');
    }

    console.log('\n✅ Agent creation and verification completed!');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

