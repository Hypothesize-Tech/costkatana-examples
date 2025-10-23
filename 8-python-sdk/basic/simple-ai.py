"""
Cost Katana Python SDK: Simple AI Call
Simple example demonstrating basic usage with automatic cost tracking.

Run: python 8-python-sdk/basic/simple-ai.py
"""

import cost_katana as ck

def main():
    print("\n🥷 Cost Katana Python SDK - Simple AI Call\n")
    
    # Simple AI call with automatic cost tracking
    response = ck.ai('gpt-4', 'Explain quantum computing in simple terms')
    
    print(f"Response: {response.text[:200]}...\n")
    print(f"💰 Cost: ${response.cost:.6f}")
    print(f"🎯 Tokens: {response.tokens}")
    print(f"🤖 Model: {response.model}")
    print(f"🏢 Provider: {response.provider}")
    print("\n📊 View details at: https://costkatana.com/dashboard\n")

if __name__ == '__main__':
    main()
