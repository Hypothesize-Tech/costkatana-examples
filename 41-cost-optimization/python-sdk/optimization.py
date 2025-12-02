import os, requests
API = "https://api.costkatana.com/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def get_recommendations():
    res = requests.get(f"{API}/optimization/recommendations",
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"💡 Recommendations: {len(res.json()['data'])}")
    return res.json()["data"]
