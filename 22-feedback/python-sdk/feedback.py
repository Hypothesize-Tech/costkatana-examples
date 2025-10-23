import os, requests
API = "https://cost-katana-backend.store/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def submit_feedback(request_id, rating):
    res = requests.post(f"{API}/v1/feedback",
        json={"requestId": request_id, "rating": rating},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print("✅ Feedback submitted")
    return res.json()["data"]
