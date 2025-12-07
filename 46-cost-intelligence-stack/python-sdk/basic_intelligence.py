"""
Cost Intelligence Stack - Basic Intelligence Example

Demonstrates how to:
- Get real-time cost intelligence insights
- View telemetry data and trends
- Access intelligence recommendations
"""

import os
from costkatana import CostKatana

client = CostKatana(api_key=os.getenv('COST_KATANA_API_KEY'))

def main():
    try:
        print('🧠 Cost Intelligence Stack - Basic Intelligence\n')

        # 1. Get current intelligence insights
        print('📊 Fetching intelligence insights...')
        insights = client.intelligence.get_insights(
            time_range='24h',
            include_recommendations=True
        )

        print('\n✅ Intelligence Insights:')
        print(f'Total Cost: ${insights["totalCost"]:.4f}')
        print(f'Total Requests: {insights["totalRequests"]}')
        print(f'Average Cost per Request: ${insights["avgCostPerRequest"]:.6f}')
        print(f'Anomalies Detected: {insights["anomaliesDetected"]}')

        # 2. Get telemetry trends
        print('\n📈 Fetching telemetry trends...')
        trends = client.intelligence.get_trends(
            time_range='7d',
            granularity='day',
            metrics=['cost', 'requests', 'latency']
        )

        print('\n✅ Trend Analysis:')
        print(f'Cost Trend: {trends["cost"]["direction"]} ({trends["cost"]["changePercent"]}%)')
        print(f'Request Trend: {trends["requests"]["direction"]} ({trends["requests"]["changePercent"]}%)')
        print(f'Latency Trend: {trends["latency"]["direction"]} ({trends["latency"]["changePercent"]}ms)')

        # 3. Get intelligence recommendations
        if insights.get('recommendations'):
            print('\n💡 Active Recommendations:')
            for index, rec in enumerate(insights['recommendations'], 1):
                print(f'\n{index}. {rec["title"]}')
                print(f'   Type: {rec["type"]}')
                print(f'   Potential Savings: ${rec["estimatedSavings"]:.4f}')
                print(f'   Priority: {rec["priority"]}')
                print(f'   Action: {rec["action"]}')

        # 4. Get layer-specific insights
        print('\n🏗️ Layer-Specific Insights:')
        layer_insights = client.intelligence.get_layer_insights()
        
        print('\nLayer 1 (Telemetry):')
        print(f'  Capture Rate: {layer_insights["telemetry"]["captureRate"]}%')
        print(f'  Streaming Active: {layer_insights["telemetry"]["streamingActive"]}')
        
        print('\nLayer 2 (Intelligence):')
        print(f'  Analysis Mode: {layer_insights["intelligence"]["mode"]}')
        print(f'  Confidence Score: {layer_insights["intelligence"]["confidenceScore"]}%')
        
        print('\nLayer 3 (Routing):')
        print(f'  Active Routes: {layer_insights["routing"]["activeRoutes"]}')
        print(f'  Optimization Rate: {layer_insights["routing"]["optimizationRate"]}%')
        
        print('\nLayer 4 (Enforcement):')
        print(f'  Blocked Requests: {layer_insights["enforcement"]["blockedRequests"]}')
        print(f'  Budget Utilization: {layer_insights["enforcement"]["budgetUtilization"]}%')
        
        print('\nLayer 5 (Caching):')
        print(f'  Cache Hit Rate: {layer_insights["caching"]["hitRate"]}%')
        print(f'  Cost Savings: ${layer_insights["caching"]["costSavings"]:.4f}')
        
        print('\nLayer 6 (Simulation):')
        print(f'  Active Simulations: {layer_insights["simulation"]["activeSimulations"]}')
        print(f'  Accuracy: {layer_insights["simulation"]["accuracy"]}%')

        print('\n✅ Intelligence query completed successfully!')

    except Exception as error:
        print(f'❌ Error: {error}')
        exit(1)

if __name__ == '__main__':
    main()

