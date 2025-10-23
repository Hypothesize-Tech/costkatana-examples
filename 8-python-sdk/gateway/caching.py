"""
Cost Katana Python SDK: Smart Caching
Save 100% on repeated requests with semantic caching.
"""

import cost_katana as ck
import time

def main():
    print("\n🥷 Cost Katana Python SDK - Smart Caching\n")
    
    prompt = "What is the capital of France?"
    
    # First request - will be cached
    print("Request 1 (fresh):")
    start = time.time()
    r1 = ck.ai('gpt-4', prompt, cache=True)
    time1 = time.time() - start
    print(f"  Cached: {r1.cached}")
    print(f"  Cost: ${r1.cost:.6f}")
    print(f"  Time: {time1:.2f}s\n")
    
    # Second request - from cache
    print("Request 2 (cached):")
    start = time.time()
    r2 = ck.ai('gpt-4', prompt, cache=True)
    time2 = time.time() - start
    print(f"  Cached: {r2.cached}")
    print(f"  Cost: ${r2.cost:.6f} (FREE!)")
    print(f"  Time: {time2:.2f}s")
    print(f"  Speedup: {time1/time2:.1f}x faster!\n")
    
    print("💰 Savings: 100% on cached requests!\n")

if __name__ == '__main__':
    main()
