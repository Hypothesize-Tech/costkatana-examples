import os, requests
API = "https://api.costkatana.com/api"
KEY = os.getenv("COST_KATANA_API_KEY")

def create_agent(name, model, system_prompt):
    res = requests.post(f"{API}/agents",
        json={"name": name, "model": model, "systemPrompt": system_prompt},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"✅ Agent created: {res.json()['data']['id']}")
    return res.json()["data"]

def chat_with_agent(agent_id, message):
    res = requests.post(f"{API}/agents/{agent_id}/chat",
        json={"message": message},
        headers={"Authorization": f"Bearer {KEY}"})
    res.raise_for_status()
    print(f"🤖 Response: {res.json()['data']['response']}")
    return res.json()["data"]
