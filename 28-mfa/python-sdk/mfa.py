import os, requests
API = "https://cost-katana-backend.store/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def enable_mfa():
    res = requests.post(f"{API}/auth/mfa/enable", json={},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"✅ MFA enabled. QR Code: {res.json()['data']['qrCode']}")
    return res.json()["data"]

def verify_mfa(code):
    res = requests.post(f"{API}/auth/mfa/verify",
        json={"code": code},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print("✅ MFA verified")
    return res.json()["data"]
