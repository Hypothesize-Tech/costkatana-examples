"""
Cost Katana Python SDK: Cost Optimization Tips
Practical examples of choosing the right model for the task.
"""

import cost_katana as ck

def main():
    print("\n🥷 Cost Katana Python SDK - Cost Optimization\n")
    
    prompts = {
        'simple': 'What is 2+2?',
        'medium': 'Explain how Docker works',
        'complex': 'Design a microservices architecture for e-commerce'
    }
    
    models = {
        'budget': 'gpt-3.5-turbo',
        'balanced': 'claude-3-5-sonnet-20241022',
        'premium': 'gpt-4'
    }
    
    print("Task Complexity vs Model Selection:\n")
    
    # Simple task - use budget model
    print("1. Simple Task:")
    r1 = ck.ai(models['budget'], prompts['simple'])
    print(f"   Model: {models['budget']}")
    print(f"   Cost: ${r1.cost:.6f}\n")
    
    # Medium task - use balanced model
    print("2. Medium Task:")
    r2 = ck.ai(models['balanced'], prompts['medium'])
    print(f"   Model: {models['balanced']}")
    print(f"   Cost: ${r2.cost:.6f}\n")
    
    # Complex task - use premium model
    print("3. Complex Task:")
    r3 = ck.ai(models['premium'], prompts['complex'])
    print(f"   Model: {models['premium']}")
    print(f"   Cost: ${r3.cost:.6f}\n")
    
    print("💡 Optimization Tips:")
    print("   • Use gpt-3.5-turbo for simple tasks (10x cheaper)")
    print("   • Use claude-3-haiku for speed (fastest + cheap)")
    print("   • Use gpt-4 only for complex reasoning")
    print("   • Enable Cortex for long-form content (70-95% savings)\n")

if __name__ == '__main__':
    main()
