import os, requests
API = "https://api.costkatana.com/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def ingest_data(source, data):
    res = requests.post(f"{API}/ingestion",
        json={"source": source, "data": data},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"✅ Data ingested: {res.json()['data']['count']}")
    return res.json()["data"]
