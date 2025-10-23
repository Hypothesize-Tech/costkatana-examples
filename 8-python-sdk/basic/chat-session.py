"""
Cost Katana Python SDK: Chat Session
Multi-turn conversation with cumulative cost tracking.
"""

import cost_katana as ck

def main():
    print("\n🥷 Cost Katana Python SDK - Chat Session\n")
    
    # Create chat session
    chat = ck.chat('gpt-4', system_message='You are a helpful AI assistant.')
    
    # Have a conversation
    print("Turn 1:")
    r1 = chat.send('What is Docker?')
    print(f"AI: {r1[:100]}...")
    print(f"💰 Cost: ${chat.total_cost:.6f}\n")
    
    print("Turn 2:")
    r2 = chat.send('How do I install it?')
    print(f"AI: {r2[:100]}...")
    print(f"💰 Cost: ${chat.total_cost:.6f}\n")
    
    print("Turn 3:")
    r3 = chat.send('Give me an example')
    print(f"AI: {r3[:100]}...")
    print(f"💰 Total Session Cost: ${chat.total_cost:.6f}\n")
    print(f"📝 Total Messages: {len(chat.history)}")
    print(f"🎯 Total Tokens: {chat.total_tokens}\n")

if __name__ == '__main__':
    main()
