"""
Cost Katana Cache: Monitor Cache Statistics (Python)

Track cache performance and cost savings.

Run: python 18-cache/python-sdk/cache_stats.py
"""

import os
import requests

API_BASE = "https://api.costkatana.com/api"
GATEWAY_URL = f"{API_BASE}/gateway/v1/chat/completions"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def get_cache_stats():
    """Get cache statistics"""
    
    response = requests.get(
        f"{API_BASE}/cache/stats",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    
    response.raise_for_status()
    stats = response.json()["data"]
    
    print("📊 Cache Statistics:\n")
    print("Redis Cache:")
    print(f"  Hits: {stats['redis']['hits']}")
    print(f"  Misses: {stats['redis']['misses']}")
    print(f"  Total Requests: {stats['redis']['totalRequests']}")
    print(f"  Hit Rate: {stats['redis']['hitRate']:.2f}%")
    print(f"  Cost Saved: ${stats['redis']['costSaved']:.2f}")
    print(f"  Tokens Saved: {stats['redis']['tokensSaved']:,}")
    
    print("\nCombined Statistics:")
    print(f"  Total Hit Rate: {stats['combined']['hitRate']:.2f}%")
    print(f"  Total Cost Saved: ${stats['combined']['totalCostSaved']:.2f}")
    
    return stats

def demonstrate_caching():
    """Demonstrate caching with API calls"""
    
    print("\n🥷 Cache Demonstration\n")
    
    # First request (cache miss)
    print("1️⃣ First request (cache miss)...")
    r1 = requests.post(
        GATEWAY_URL,
        json={
            "model": "gpt-4",
            "messages": [{"role": "user", "content": "What is the capital of France?"}]
        },
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "X-Enable-Cache": "true",
            "X-Cache-TTL": "3600"
        }
    )
    r1.raise_for_status()
    print(f"  Cache Status: {r1.headers.get('X-Cache-Status')}")
    
    # Second request (cache hit)
    print("\n2️⃣ Second request (cache hit)...")
    r2 = requests.post(
        GATEWAY_URL,
        json={
            "model": "gpt-4",
            "messages": [{"role": "user", "content": "What is the capital of France?"}]
        },
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "X-Enable-Cache": "true"
        }
    )
    r2.raise_for_status()
    print(f"  Cache Status: {r2.headers.get('X-Cache-Status')}")
    print(f"  Cost Saved: ${r2.headers.get('X-Cost-Saved')}")
    print(f"  Tokens Saved: {r2.headers.get('X-Tokens-Saved')}")
    
    # Semantic match
    print("\n3️⃣ Semantically similar request...")
    r3 = requests.post(
        GATEWAY_URL,
        json={
            "model": "gpt-4",
            "messages": [{"role": "user", "content": "Tell me the capital city of France"}]
        },
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "X-Enable-Cache": "true"
        }
    )
    r3.raise_for_status()
    print(f"  Cache Status: {r3.headers.get('X-Cache-Status')}")
    print(f"  Similarity Score: {r3.headers.get('X-Similarity-Score')}")

def main():
    if not API_KEY:
        print("❌ COST_KATANA_API_KEY required")
        return
    
    try:
        get_cache_stats()
        demonstrate_caching()
        
        print("\n✅ Cache statistics demo complete!")
        print("\n💡 Benefits:")
        print("  • 70-90% cache hit rate")
        print("  • 30-40% cost reduction")
        print("  • Instant responses")
        print("  • Semantic matching")
        
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error: {e.response.json() if e.response else e}")

if __name__ == "__main__":
    main()
