"""
Cost Katana Python SDK: Dashboard Integration
All usage automatically syncs to your dashboard.
"""

import cost_katana as ck

def main():
    print("\n🥷 Cost Katana Python SDK - Dashboard Integration\n")
    
    # All requests are automatically tracked
    chat = ck.chat('gpt-4')
    
    chat.send("What is Kubernetes?")
    chat.send("How do I deploy an app?")
    chat.send("What are best practices?")
    
    print(f"Session Summary:")
    print(f"  📝 Messages: {len(chat.history)}")
    print(f"  💰 Total Cost: ${chat.total_cost:.6f}")
    print(f"  🎯 Total Tokens: {chat.total_tokens}")
    
    print(f"\n📊 View detailed analytics at:")
    print(f"   https://costkatana.com/dashboard")
    
    print(f"\n📈 Dashboard Features:")
    print(f"   • Real-time cost tracking")
    print(f"   • Usage by model & provider")
    print(f"   • Daily/weekly/monthly reports")
    print(f"   • Budget alerts")
    print(f"   • Team analytics")
    print(f"   • Optimization recommendations\n")

if __name__ == '__main__':
    main()
