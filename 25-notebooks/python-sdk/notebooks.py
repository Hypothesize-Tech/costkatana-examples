import os, requests
API = "https://api.costkatana.com/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def create_notebook(name, description=None):
    res = requests.post(f"{API}/notebooks",
        json={"name": name, "description": description},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"✅ Notebook created: {res.json()['data']['id']}")
    return res.json()["data"]

def list_notebooks():
    res = requests.get(f"{API}/notebooks",
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"📓 Found {len(res.json()['data'])} notebooks")
    return res.json()["data"]
