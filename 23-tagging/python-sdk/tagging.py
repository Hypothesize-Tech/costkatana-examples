import os, requests
API = "https://cost-katana-backend.store/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def add_tags(request_id, tags):
    res = requests.post(f"{API}/tags",
        json={"requestId": request_id, "tags": tags},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print("✅ Tags added")
    return res.json()["data"]
