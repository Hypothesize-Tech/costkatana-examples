"""
Cost Katana Python SDK: Cortex for Long-Form Content
Demonstrates massive savings on blog posts, documentation, etc.
"""

import cost_katana as ck

def main():
    print("\n🥷 Cost Katana Python SDK - Cortex Long-Form Content\n")
    
    long_form_prompt = """
    Write a comprehensive 2000-word guide on building scalable microservices.
    Include: architecture patterns, service discovery, API gateway design,
    data management strategies, deployment best practices, monitoring solutions,
    security considerations, and real-world case studies.
    """
    
    print("Generating long-form content...\n")
    
    # Without Cortex
    print("1. Without Cortex:")
    normal = ck.ai('gpt-4', long_form_prompt, cortex=False)
    print(f"   Words Generated: {len(normal.text.split())}")
    print(f"   Cost: ${normal.cost:.6f}")
    print(f"   Tokens: {normal.tokens}\n")
    
    # With Cortex - massive savings!
    print("2. With Cortex:")
    optimized = ck.ai('gpt-4', long_form_prompt, cortex=True)
    print(f"   Words Generated: {len(optimized.text.split())}")
    print(f"   Cost: ${optimized.cost:.6f}")
    print(f"   Tokens: {optimized.tokens}")
    print(f"   Saved: ${optimized.saved_amount:.6f}")
    
    savings_pct = ((normal.cost - optimized.cost) / normal.cost * 100)
    print(f"   Savings: {savings_pct:.1f}%\n")
    
    print("🎯 Use Cases for Cortex:")
    print("   • Blog posts & articles")
    print("   • Technical documentation")
    print("   • Educational content")
    print("   • API documentation")
    print("   • Comprehensive guides\n")

if __name__ == '__main__':
    main()
