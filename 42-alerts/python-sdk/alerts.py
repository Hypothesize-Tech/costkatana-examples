import os, requests
API = "https://cost-katana-backend.store/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def create_alert(name, threshold, alert_type):
    res = requests.post(f"{API}/alerts",
        json={"name": name, "threshold": threshold, "type": alert_type},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"✅ Alert created: {res.json()['data']['id']}")
    return res.json()["data"]
