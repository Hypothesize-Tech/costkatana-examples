"""
Cost Katana Python SDK: Multi-Provider Examples
Demonstrates usage across different AI providers.
"""

import cost_katana as ck

def main():
    print("\n🥷 Cost Katana Python SDK - Multi-Provider\n")
    
    prompt = "What is Kubernetes?"
    
    providers = [
        ('gpt-4', 'OpenAI'),
        ('claude-3-5-sonnet-20241022', 'Anthropic'),
        ('gemini-pro', 'Google'),
        ('nova-pro', 'AWS Bedrock'),
    ]
    
    for model, provider_name in providers:
        try:
            print(f"\n{provider_name} ({model}):")
            response = ck.ai(model, prompt)
            print(f"  Response: {response.text[:80]}...")
            print(f"  💰 Cost: ${response.cost:.6f}")
        except Exception as e:
            print(f"  ❌ Error: {str(e)}")
    
    print("\n✅ One SDK, all providers!\n")

if __name__ == '__main__':
    main()
