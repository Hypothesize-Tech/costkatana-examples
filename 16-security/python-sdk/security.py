import os, requests
API_BASE = "https://api.costkatana.com/api"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def security_scan(scan_type, data):
    response = requests.post(
        f"{API_BASE}/security/scan",
        json={"type": scan_type, "data": data},
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    response.raise_for_status()
    print("Security scan:", response.json())
    return response.json()
