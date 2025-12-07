"""
Closed-Loop Cost Brain - Basic Example

Demonstrates how to:
- Enable Cost Brain for autonomous optimization
- Make AI requests with brain interventions
- View brain decisions and savings
"""

import os
from costkatana import ai, CostKatana, OPENAI

client = CostKatana(api_key=os.getenv('COST_KATANA_API_KEY'))

def main():
    try:
        print('🧠 Closed-Loop Cost Brain - Basic Example\n')

        # 1. Enable Cost Brain
        print('⚙️ Enabling Cost Brain...')
        client.brain.enable(
            mode='autonomous',
            interventions={
                'modelDowngrade': True,
                'providerSwitch': True,
                'promptCompression': True,
                'requestBlocking': True
            },
            thresholds={
                'maxCostPerRequest': 0.50,
                'qualityThreshold': 0.85
            }
        )

        print('✅ Cost Brain enabled in autonomous mode\n')

        # 2. Make an AI request (Brain will optimize automatically)
        print('💬 Making AI request with Cost Brain...')
        response = ai(
            OPENAI.GPT_4_TURBO,
            'Explain quantum computing in simple terms',
            max_tokens=500,
            temperature=0.7
        )

        print('\n📊 Response:')
        print(response.text)
        print('\n💰 Cost Analysis:')
        print(f'Original Estimated Cost: ${response.metrics.originalEstimatedCost:.6f}')
        print(f'Actual Cost: ${response.cost:.6f}')
        print(f'Savings: ${response.metrics.savings:.6f} ({response.metrics.savingsPercent}%)')

        # 3. Check if Brain intervened
        if response.brain:
            print('\n🧠 Brain Interventions:')
            print(f'Intervened: {response.brain.intervened}')
            
            if response.brain.intervened:
                print(f'Intervention Type: {response.brain.interventionType}')
                print(f'Original Model: {response.brain.originalModel}')
                print(f'Optimized Model: {response.brain.optimizedModel}')
                print(f'Reason: {response.brain.reason}')
                print(f'Quality Score: {response.brain.qualityScore}')

        # 4. Get brain statistics
        print('\n📈 Cost Brain Statistics:')
        stats = client.brain.get_statistics(time_range='24h')

        print(f'Total Requests: {stats["totalRequests"]}')
        print(f'Interventions: {stats["interventions"]} ({stats["interventionRate"]}%)')
        print(f'Total Savings: ${stats["totalSavings"]:.4f}')
        print(f'Avg Savings per Request: ${stats["avgSavingsPerRequest"]:.6f}')
        print(f'Quality Score: {stats["avgQualityScore"]}/1.0')

        print('\n📊 Intervention Breakdown:')
        print(f'Model Downgrades: {stats["interventionTypes"]["modelDowngrade"]}')
        print(f'Provider Switches: {stats["interventionTypes"]["providerSwitch"]}')
        print(f'Prompt Compressions: {stats["interventionTypes"]["promptCompression"]}')
        print(f'Requests Blocked: {stats["interventionTypes"]["requestBlocking"]}')

        print('\n✅ Cost Brain example completed successfully!')

    except Exception as error:
        print(f'❌ Error: {error}')
        exit(1)

if __name__ == '__main__':
    main()

