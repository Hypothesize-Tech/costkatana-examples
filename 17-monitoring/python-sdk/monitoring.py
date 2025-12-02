import os, requests
API_BASE = "https://api.costkatana.com/api"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def get_metrics():
    response = requests.get(
        f"{API_BASE}/monitoring/metrics",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    response.raise_for_status()
    print("Metrics:", response.json())
    return response.json()

def get_health():
    response = requests.get(
        f"{API_BASE}/monitoring/health",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    response.raise_for_status()
    print("Health:", response.json())
    return response.json()
