"""
Cost Katana Cache: Cache Control Operations (Python)

Clear, warmup, export, and import cache.

Run: python 18-cache/python-sdk/cache_control.py
"""

import os
import requests
from typing import List, Optional

API_BASE = "https://cost-katana-backend.store/api"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def clear_cache(model: Optional[str] = None, older_than: Optional[int] = None):
    """Clear cache"""
    
    params = {}
    if model:
        params["model"] = model
    if older_than:
        params["olderThan"] = older_than
    
    response = requests.delete(
        f"{API_BASE}/cache/clear",
        params=params,
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    
    response.raise_for_status()
    data = response.json()["data"]
    
    print("✅ Cache cleared:")
    print(f"  Entries cleared: {data['entriesCleared']}")
    print(f"  Bytes freed: {data['bytesFreed'] / 1024 / 1024:.2f} MB")
    
    return data

def warmup_cache(prompts: List[str], model: str = "gpt-4", ttl: int = 86400):
    """Warmup cache with common queries"""
    
    response = requests.post(
        f"{API_BASE}/cache/warmup",
        json={"prompts": prompts, "model": model, "ttl": ttl},
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
    )
    
    response.raise_for_status()
    data = response.json()["data"]
    
    print("✅ Cache warmup complete:")
    print(f"  Cached: {data['cached']}")
    print(f"  Failed: {data['failed']}")
    print(f"  Total Cost: ${data['totalCost']:.4f}")
    
    return data

def export_cache(format: str = "json"):
    """Export cache data"""
    
    response = requests.get(
        f"{API_BASE}/cache/export",
        params={"format": format},
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    
    response.raise_for_status()
    print(f"✅ Cache exported ({format})")
    
    return response.json()

def main():
    if not API_KEY:
        print("❌ COST_KATANA_API_KEY required")
        return
    
    print("🥷 Cache Control Operations\n")
    
    try:
        # 1. Warmup cache
        print("1️⃣ Warming up cache...")
        warmup_cache([
            "What is AI?",
            "Explain machine learning",
            "What is deep learning?"
        ])
        
        # 2. Export cache
        print("\n2️⃣ Exporting cache...")
        export_cache()
        
        # 3. Clear old entries
        print("\n3️⃣ Clearing old entries...")
        clear_cache(older_than=86400)
        
        print("\n✅ Cache control operations complete!")
        
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error: {e.response.json() if e.response else e}")

if __name__ == "__main__":
    main()
