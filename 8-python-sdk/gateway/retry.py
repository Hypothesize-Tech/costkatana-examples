"""
Cost Katana Python SDK: Automatic Retry
Handle rate limits and transient failures automatically.
"""

import cost_katana as ck

def main():
    print("\n🥷 Cost Katana Python SDK - Automatic Retry\n")
    
    # Enable retry with exponential backoff
    response = ck.ai('gpt-4', 'Test retry logic', retry=True, max_retries=3)
    
    print(f"Response: {response.text[:100]}...")
    print(f"💰 Cost: ${response.cost:.6f}")
    print(f"🔄 Retry Count: {response.retry_count}")
    print("\n✅ Automatic retry handles rate limits!\n")

if __name__ == '__main__':
    main()
