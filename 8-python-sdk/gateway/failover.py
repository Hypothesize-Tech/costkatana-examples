"""
Cost Katana Python SDK: Auto-Failover
Automatic provider fallback for 99.99% availability.
"""

import cost_katana as ck

def main():
    print("\n🥷 Cost Katana Python SDK - Auto-Failover\n")
    
    # Configure with fallback providers
    ck.configure(
        failover=True,
        providers=['openai', 'anthropic', 'google']
    )
    
    # If OpenAI fails, automatically tries Anthropic, then Google
    response = ck.ai('gpt-4', 'Test failover reliability')
    
    print(f"Response: {response.text[:100]}...")
    print(f"💰 Cost: ${response.cost:.6f}")
    print(f"🏢 Provider Used: {response.provider}")
    print(f"🔄 Failover Triggered: {response.failed_over}")
    print("\n✅ 99.99% availability with automatic failover!\n")

if __name__ == '__main__':
    main()
