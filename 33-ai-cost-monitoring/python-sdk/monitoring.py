import os, requests
API = "https://cost-katana-backend.store/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def get_cost_trends():
    res = requests.get(f"{API}/monitoring/cost-trends",
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"📈 Cost trends: {res.json()['data']}")
    return res.json()["data"]
