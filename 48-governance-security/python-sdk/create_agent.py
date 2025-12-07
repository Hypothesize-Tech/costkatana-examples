"""
AI Governance & Security - Create Governed Agent

Demonstrates how to:
- Create an AI agent with governance controls
- Configure RBAC permissions
- Set budget and rate limits
"""

import os
from costkatana import CostKatana

client = CostKatana(api_key=os.getenv('COST_KATANA_API_KEY'))

def main():
    try:
        print('🛡️ AI Governance & Security - Create Agent\n')

        # 1. Create a governed AI agent
        print('👤 Creating governed AI agent...')
        agent = client.governance.create_agent(
            agent_name='customer-support-bot',
            agent_type='multiagent',
            
            # Authentication
            token_prefix='ck-agent-support',
            
            # Authorization (RBAC)
            allowed_models=[
                'gpt-4-turbo',
                'gpt-3.5-turbo',
                'claude-3-sonnet',
            ],
            allowed_providers=['openai', 'anthropic'],
            allowed_actions=['read', 'write', 'execute'],
            
            # Resource constraints
            budget_cap_per_request=0.25,
            budget_cap_per_day=10.00,
            budget_cap_per_month=200.00,
            
            # Rate limiting
            max_requests_per_minute=20,
            max_requests_per_hour=500,
            max_concurrent_executions=5,
            
            # Sandbox requirements
            sandbox_required=True,
            sandbox_config={
                'maxCpuCores': 0.5,
                'maxMemoryMB': 512,
                'maxDiskMB': 100,
                'maxExecutionTimeSeconds': 300,
                'isolationLevel': 'container'
            },
            
            # Security settings
            require_mfa=False,
            audit_level='comprehensive',
            
            # Metadata
            description='Customer support chatbot agent',
            tags=['production', 'customer-facing']
        )

        print('\n✅ Agent created successfully!')
        print(f'Agent ID: {agent["agentId"]}')
        print(f'Agent Token: {agent["agentToken"]}')
        print('⚠️  Store the agent token securely!\n')

        # 2. Verify agent permissions
        print('🔍 Verifying agent permissions...')
        permissions = client.governance.get_agent_permissions(agent['agentId'])
        
        print('\n📋 Agent Permissions:')
        print(f'Models: {", ".join(permissions["allowedModels"])}')
        print(f'Providers: {", ".join(permissions["allowedProviders"])}')
        print(f'Budget Cap (Request): ${permissions["budgetCapPerRequest"]}')
        print(f'Budget Cap (Day): ${permissions["budgetCapPerDay"]}')

        # 3. Test agent authentication
        print('\n🔐 Testing agent authentication...')
        auth_result = client.governance.authenticate_agent(agent['agentToken'])
        
        status = '✅ Valid' if auth_result['valid'] else '❌ Invalid'
        print(f'Authentication: {status}')
        print(f'Agent Name: {auth_result["agentName"]}')

        print('\n✅ Agent creation completed!')

    except Exception as error:
        print(f'❌ Error: {error}')
        exit(1)

if __name__ == '__main__':
    main()

