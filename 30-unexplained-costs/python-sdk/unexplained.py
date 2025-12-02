import os, requests
API = "https://api.costkatana.com/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def get_unexplained_costs():
    res = requests.get(f"{API}/analytics/unexplained-costs",
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"💰 Unexplained costs: {res.json()['data']['total']}")
    return res.json()["data"]

def get_cost_anomalies():
    res = requests.get(f"{API}/analytics/cost-anomalies",
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"⚠️ Anomalies found: {len(res.json()['data'])}")
    return res.json()["data"]
