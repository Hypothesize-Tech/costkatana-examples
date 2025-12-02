import os, requests
API = "https://api.costkatana.com/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def create_template(name, template):
    res = requests.post(f"{API}/prompt-templates",
        json={"name": name, "template": template},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"✅ Template created: {res.json()['data']['id']}")
    return res.json()["data"]
