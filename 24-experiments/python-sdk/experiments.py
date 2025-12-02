import os, requests
API = "https://api.costkatana.com/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def create_experiment(name, variants):
    res = requests.post(f"{API}/experimentation",
        json={"name": name, "variants": variants},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"✅ Experiment created: {res.json()['data']['id']}")
    return res.json()["data"]
