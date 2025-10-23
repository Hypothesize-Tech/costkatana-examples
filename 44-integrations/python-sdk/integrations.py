import os, requests
API = "https://cost-katana-backend.store/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def list_integrations():
    res = requests.get(f"{API}/integrations",
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"🔌 Integrations: {len(res.json()['data'])}")
    return res.json()["data"]

def connect_integration(provider, credentials):
    res = requests.post(f"{API}/integrations/connect",
        json={"provider": provider, "credentials": credentials},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"✅ Integration connected: {provider}")
    return res.json()["data"]
