import os, requests
API = "https://cost-katana-backend.store/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def get_telemetry_config():
    res = requests.get(f"{API}/user-telemetry-config",
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"📊 Telemetry config: {res.json()['data']}")
    return res.json()["data"]

def update_telemetry_config(enabled, sampling):
    res = requests.put(f"{API}/user-telemetry-config",
        json={"enabled": enabled, "sampling": sampling},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print("✅ Telemetry config updated")
    return res.json()["data"]
