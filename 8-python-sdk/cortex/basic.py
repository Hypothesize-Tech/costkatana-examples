"""
Cost Katana Python SDK: Cortex Optimization
Revolutionary 40-75% cost reduction for long-form content.
"""

import cost_katana as ck

def main():
    print("\n🥷 Cost Katana Python SDK - Cortex Optimization\n")
    
    long_prompt = """Write a comprehensive guide to microservices architecture. 
    Include: service decomposition, inter-service communication, API gateway patterns, 
    data management, deployment strategies, and best practices. Make it detailed."""
    
    # Without Cortex
    print("Without Cortex:")
    normal = ck.ai('gpt-4', long_prompt, cortex=False)
    print(f"  Cost: ${normal.cost:.6f}")
    print(f"  Tokens: {normal.tokens}\n")
    
    # With Cortex - 40-75% savings!
    print("With Cortex:")
    optimized = ck.ai('gpt-4', long_prompt, cortex=True)
    print(f"  Cost: ${optimized.cost:.6f}")
    print(f"  Optimized: {optimized.optimized}")
    print(f"  Saved: ${optimized.saved_amount:.6f}")
    print(f"  Reduction: {((normal.cost - optimized.cost) / normal.cost * 100):.1f}%\n")
    
    print("🎯 Use Cortex for content >500 tokens!\n")

if __name__ == '__main__':
    main()
