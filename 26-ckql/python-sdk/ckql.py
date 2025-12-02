import os, requests
API = "https://api.costkatana.com/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def execute_query(query):
    res = requests.post(f"{API}/ckql/query",
        json={"query": query},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"✅ Query executed: {len(res.json()['data'])} rows")
    return res.json()["data"]

def get_schema():
    res = requests.get(f"{API}/ckql/schema",
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"📊 Schema: {', '.join(res.json()['data'].keys())}")
    return res.json()["data"]
