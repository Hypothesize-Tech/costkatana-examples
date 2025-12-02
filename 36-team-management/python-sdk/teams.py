import os, requests
API = "https://api.costkatana.com/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def create_team(name):
    res = requests.post(f"{API}/teams",
        json={"name": name},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"✅ Team created: {res.json()['data']['id']}")
    return res.json()["data"]

def add_member(team_id, email, role):
    res = requests.post(f"{API}/teams/{team_id}/members",
        json={"email": email, "role": role},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"✅ Member added: {email}")
    return res.json()["data"]
