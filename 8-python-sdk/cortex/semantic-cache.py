"""
Cost Katana Python SDK: Cortex Semantic Caching
Cache optimized Cortex structures for maximum savings.
"""

import cost_katana as ck

def main():
    print("\n🥷 Cost Katana Python SDK - Cortex Semantic Cache\n")
    
    prompt = "Write a guide on Kubernetes deployment strategies"
    
    # First request with Cortex - will cache
    print("Request 1 (fresh, with Cortex):")
    r1 = ck.ai('gpt-4', prompt, cortex=True, cache=True)
    print(f"  Cached: {r1.cached}")
    print(f"  Cost: ${r1.cost:.6f}")
    print(f"  Cortex Optimized: {r1.optimized}\n")
    
    # Second request - hits Cortex cache
    print("Request 2 (cached, with Cortex):")
    r2 = ck.ai('gpt-4', prompt, cortex=True, cache=True)
    print(f"  Cached: {r2.cached}")
    print(f"  Cost: ${r2.cost:.6f} (FREE!)")
    print(f"  Total Savings: 100%\n")
    
    print("💰 Cortex + Caching = Ultimate Savings!")
    print("   First request: 70-95% savings with Cortex")
    print("   Repeat requests: 100% free from cache\n")

if __name__ == '__main__':
    main()
