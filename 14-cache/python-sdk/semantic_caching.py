"""
Cost Katana Cache: Semantic Caching (Python)

Advanced semantic similarity caching.

Run: python 18-cache/python-sdk/semantic_caching.py
"""

import os
import requests

GATEWAY_URL = "https://cost-katana-backend.store/api/gateway/v1/chat/completions"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def semantic_caching_demo():
    """Demonstrate semantic caching"""
    
    print("🥷 Semantic Caching Demonstration\n")
    
    # Original query
    print("1️⃣ Original query...")
    r1 = requests.post(
        GATEWAY_URL,
        json={
            "model": "gpt-4",
            "messages": [{"role": "user", "content": "What are the benefits of cloud computing?"}]
        },
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "X-Enable-Cache": "true",
            "X-Semantic-Threshold": "0.90"
        }
    )
    r1.raise_for_status()
    print(f"  Cache Status: {r1.headers.get('X-Cache-Status')}")
    
    # Semantically similar
    print("\n2️⃣ Semantically similar query...")
    r2 = requests.post(
        GATEWAY_URL,
        json={
            "model": "gpt-4",
            "messages": [{"role": "user", "content": "Tell me the advantages of using cloud services"}]
        },
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "X-Enable-Cache": "true"
        }
    )
    r2.raise_for_status()
    print(f"  Cache Status: {r2.headers.get('X-Cache-Status')}")
    print(f"  Similarity Score: {r2.headers.get('X-Similarity-Score')}")
    print(f"  Cost Saved: ${r2.headers.get('X-Cost-Saved')}")
    
    print("\n💡 Semantic Caching Features:")
    print("  ✅ Recognizes paraphrased queries")
    print("  ✅ Handles different phrasings")
    print("  ✅ Context-aware matching")
    print("  ✅ 70-90% hit rate typical")

def main():
    if not API_KEY:
        print("❌ COST_KATANA_API_KEY required")
        return
    
    try:
        semantic_caching_demo()
        print("\n✅ Semantic caching demo complete!")
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error: {e.response.json() if e.response else e}")

if __name__ == "__main__":
    main()
