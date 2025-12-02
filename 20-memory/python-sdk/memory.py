import os, requests
API = "https://api.costkatana.com/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def store_memory(agent_id, key, value):
    res = requests.post(f"{API}/memory",
        json={"agentId": agent_id, "key": key, "value": value},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print("✅ Memory stored")
    return res.json()["data"]

def get_memory(agent_id, key):
    res = requests.get(f"{API}/memory/{agent_id}/{key}",
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"📖 Memory: {res.json()['data']}")
    return res.json()["data"]
