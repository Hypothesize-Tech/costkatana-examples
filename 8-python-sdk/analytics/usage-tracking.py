"""
Cost Katana Python SDK: Usage Tracking
Track costs and tokens across multiple requests.
"""

import cost_katana as ck

def main():
    print("\n🥷 Cost Katana Python SDK - Usage Tracking\n")
    
    chat = ck.chat('gpt-4')
    
    # Make several requests
    chat.send("Hello")
    chat.send("What is Python?")
    chat.send("Give me an example")
    chat.send("Explain decorators")
    
    print(f"Session Summary:")
    print(f"  📝 Messages: {len(chat.history)}")
    print(f"  💰 Total Cost: ${chat.total_cost:.6f}")
    print(f"  🎯 Total Tokens: {chat.total_tokens}")
    print(f"  📊 Avg Cost/Message: ${chat.total_cost / (len(chat.history) / 2):.6f}")
    print(f"\n📈 View full analytics at: https://costkatana.com/dashboard\n")

if __name__ == '__main__':
    main()
