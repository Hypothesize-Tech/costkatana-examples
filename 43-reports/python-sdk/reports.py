import os, requests
API = "https://cost-katana-backend.store/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def generate_report(report_type, format):
    res = requests.post(f"{API}/reports/generate",
        json={"type": report_type, "format": format},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"✅ Report generated: {res.json()['data']['id']}")
    return res.json()["data"]
