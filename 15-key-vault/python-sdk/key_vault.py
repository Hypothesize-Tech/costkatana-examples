"""
Cost Katana Key Vault: Provider Keys (Python)

Run: python 19-key-vault/python-sdk/key_vault.py
"""

import os
import requests

API_BASE = "https://cost-katana-backend.store/api"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def create_provider_key(provider, api_key, name):
    response = requests.post(
        f"{API_BASE}/key-vault/provider-keys",
        json={"provider": provider, "apiKey": api_key, "name": name},
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    response.raise_for_status()
    print(f"✅ Created {provider} key")
    return response.json()["data"]

def list_provider_keys():
    response = requests.get(
        f"{API_BASE}/key-vault/provider-keys",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    response.raise_for_status()
    print(f"📋 Found {len(response.json()['data'])} keys")
    return response.json()["data"]

if __name__ == "__main__":
    print("🥷 Key Vault: Provider Keys\n")
    create_provider_key("openai", "sk-proj-...", "Production Key")
    list_provider_keys()
