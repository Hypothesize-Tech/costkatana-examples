import os, requests
API = "https://cost-katana-backend.store/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def get_audit_logs():
    res = requests.get(f"{API}/audit-logs",
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"📋 Found {len(res.json()['data'])} audit logs")
    return res.json()["data"]

def search_logs(action, from_date=None):
    res = requests.post(f"{API}/audit-logs/search",
        json={"action": action, "from": from_date},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"🔍 Search results: {len(res.json()['data'])}")
    return res.json()["data"]
