import os, requests
API = "https://api.costkatana.com/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def send_report(recipient, report_type):
    res = requests.post(f"{API}/email/report",
        json={"recipient": recipient, "reportType": report_type},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"✅ Report sent to: {recipient}")
    return res.json()["data"]
