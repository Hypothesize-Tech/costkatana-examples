import os, requests
API = "https://cost-katana-backend.store/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def create_project(name, description=None):
    res = requests.post(f"{API}/projects", 
        json={"name": name, "description": description},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"✅ Project created: {res.json()['data']['id']}")
    return res.json()["data"]

def list_projects():
    res = requests.get(f"{API}/projects",
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"📋 Found {len(res.json()['data'])} projects")
    return res.json()["data"]

if __name__ == "__main__":
    create_project("Test Project", "Description")
    list_projects()
