"""
Cost Katana Python SDK: Model Comparison
Compare costs across different AI models.
"""

import cost_katana as ck

def main():
    print("\n🥷 Cost Katana Python SDK - Model Comparison\n")
    
    models = ['gpt-4', 'gpt-3.5-turbo', 'claude-3-5-sonnet-20241022', 'gemini-pro']
    prompt = 'Explain the difference between REST and GraphQL APIs'
    
    print(f"Prompt: {prompt}\n")
    print("Model                      | Cost       | Tokens")
    print("-" * 55)
    
    for model in models:
        try:
            response = ck.ai(model, prompt)
            print(f"{model:25} | ${response.cost:.6f} | {response.tokens}")
        except Exception as e:
            print(f"{model:25} | Error: {str(e)[:20]}")
    
    print("\n💡 Tip: Use cheaper models for simple tasks!\n")

if __name__ == '__main__':
    main()
