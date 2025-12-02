import os, requests
API = "https://api.costkatana.com/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def upload_training_data(prompts):
    res = requests.post(f"{API}/cortex/training",
        json={"prompts": prompts},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"✅ Training data uploaded: {res.json()['data']['count']}")
    return res.json()["data"]
