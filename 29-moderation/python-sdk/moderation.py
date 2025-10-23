import os, requests
API = "https://cost-katana-backend.store/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def moderate_content(text):
    res = requests.post(f"{API}/moderation/check",
        json={"text": text},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    result = "🚫 Flagged" if res.json()['data']['flagged'] else "✅ Safe"
    print(f"✅ Moderation result: {result}")
    return res.json()["data"]
