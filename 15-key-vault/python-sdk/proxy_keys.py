"""
Cost Katana Key Vault: Proxy Keys (Python)

Run: python 19-key-vault/python-sdk/proxy_keys.py
"""

import os
import requests

API_BASE = "https://cost-katana-backend.store/api"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def create_proxy_key(config):
    response = requests.post(
        f"{API_BASE}/key-vault/proxy-keys",
        json=config,
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    response.raise_for_status()
    print(f"✅ Created proxy key: {response.json()['data']['proxyKey']}")
    return response.json()["data"]

def list_proxy_keys():
    response = requests.get(
        f"{API_BASE}/key-vault/proxy-keys",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    response.raise_for_status()
    print(f"📋 Found {len(response.json()['data'])} proxy keys")
    return response.json()["data"]

if __name__ == "__main__":
    print("🥷 Key Vault: Proxy Keys\n")
    create_proxy_key({
        "name": "Frontend Key",
        "permissions": ["chat"],
        "rateLimit": {"requestsPerMinute": 60},
        "budgetLimit": 100
    })
    list_proxy_keys()
