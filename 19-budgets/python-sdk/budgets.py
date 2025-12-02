import os, requests
API = "https://api.costkatana.com/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def create_budget(name, limit, period):
    res = requests.post(f"{API}/budget",
        json={"name": name, "limit": limit, "period": period},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"✅ Budget created: {res.json()['data']['id']}")
    return res.json()["data"]

def list_budgets():
    res = requests.get(f"{API}/budget",
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"💰 Found {len(res.json()['data'])} budgets")
    return res.json()["data"]
