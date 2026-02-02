import os, requests
API = "https://api.costkatana.com/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def get_failover_config():
    res = requests.get(f"{API}/failover/config",
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"🔄 Failover config: {res.json()['data']}")
    return res.json()["data"]

def update_failover_config(enabled, providers):
    res = requests.put(f"{API}/failover/config",
        json={"enabled": enabled, "providers": providers},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print("✅ Failover config updated")
    return res.json()["data"]
