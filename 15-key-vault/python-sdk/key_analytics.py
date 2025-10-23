"""
Cost Katana Key Vault: Analytics (Python)

Run: python 19-key-vault/python-sdk/key_analytics.py
"""

import os
import requests

API_BASE = "https://cost-katana-backend.store/api"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def get_dashboard():
    response = requests.get(
        f"{API_BASE}/key-vault/dashboard",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    response.raise_for_status()
    data = response.json()["data"]
    print("📊 Key Vault Dashboard:")
    print(f"  Provider Keys: {data['providerKeys']}")
    print(f"  Proxy Keys: {data['proxyKeys']}")
    return data

def get_analytics():
    response = requests.get(
        f"{API_BASE}/key-vault/analytics",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    response.raise_for_status()
    data = response.json()["data"]
    print("📈 Analytics:")
    print(f"  Total Requests: {data['totalRequests']}")
    print(f"  Total Cost: ${data['totalCost']}")
    return data

if __name__ == "__main__":
    print("🥷 Key Vault: Analytics\n")
    get_dashboard()
    get_analytics()
