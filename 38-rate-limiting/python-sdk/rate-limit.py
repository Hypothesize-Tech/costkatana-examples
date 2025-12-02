import os, requests
API = "https://api.costkatana.com/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def get_rate_limits():
    res = requests.get(f"{API}/rate-limits",
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"⚡ Rate limits: {res.json()['data']}")
    return res.json()["data"]

def update_rate_limits(requests_per_minute, requests_per_hour):
    res = requests.put(f"{API}/rate-limits",
        json={"requestsPerMinute": requests_per_minute, "requestsPerHour": requests_per_hour},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print("✅ Rate limits updated")
    return res.json()["data"]
