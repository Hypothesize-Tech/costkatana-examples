import os, requests
API = "https://api.costkatana.com/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def get_routing_config():
    res = requests.get(f"{API}/model-routing/config",
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"🎯 Routing config: {res.json()['data']}")
    return res.json()["data"]
