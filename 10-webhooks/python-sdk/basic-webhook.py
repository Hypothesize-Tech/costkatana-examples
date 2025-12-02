"""
Cost Katana Webhooks: Basic Webhook Management (Python)

Create and manage webhooks to receive real-time cost alerts.

Run: python 10-webhooks/python-sdk/basic-webhook.py
"""

import os
import requests
from typing import List, Dict, Optional

API_BASE_URL = "https://api.costkatana.com/api"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def create_webhook(
    name: str,
    url: str,
    events: List[str],
    description: Optional[str] = None,
    secret: Optional[str] = None
) -> Dict:
    """Create a new webhook"""
    
    response = requests.post(
        f"{API_BASE_URL}/webhooks",
        json={
            "name": name,
            "url": url,
            "events": events,
            "description": description or f"Webhook for {name}",
            "active": True,
            "secret": secret or os.getenv("WEBHOOK_SECRET", "your_secret")
        },
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
    )
    
    response.raise_for_status()
    webhook = response.json()["webhook"]
    
    print(f"✅ Webhook created: {webhook['id']}")
    print(f"   Name: {webhook['name']}")
    print(f"   URL: {webhook['url']}")
    print(f"   Events: {len(webhook['events'])}")
    
    return webhook

def list_webhooks() -> List[Dict]:
    """List all webhooks"""
    
    response = requests.get(
        f"{API_BASE_URL}/webhooks",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    
    response.raise_for_status()
    webhooks = response.json()["webhooks"]
    
    print(f"\n📋 Found {len(webhooks)} webhooks:")
    for i, webhook in enumerate(webhooks, 1):
        print(f"   {i}. {webhook['name']} - {webhook['id']}")
        print(f"      Active: {webhook['active']}, Events: {len(webhook['events'])}")
    
    return webhooks

def delete_webhook(webhook_id: str):
    """Delete a webhook"""
    
    response = requests.delete(
        f"{API_BASE_URL}/webhooks/{webhook_id}",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    
    response.raise_for_status()
    print(f"✅ Webhook {webhook_id} deleted")

def main():
    if not API_KEY:
        print("❌ COST_KATANA_API_KEY environment variable required")
        return
    
    print("🥷 Cost Katana Webhooks (Python)\n")
    
    try:
        # Create webhook
        print("1️⃣ Creating webhook...")
        webhook = create_webhook(
            name="Cost Alerts",
            url="https://your-server.com/webhooks/cost",
            events=["cost.alert", "budget.exceeded"]
        )
        
        # List all webhooks
        print("\n2️⃣ Listing webhooks...")
        list_webhooks()
        
        # Clean up
        print("\n3️⃣ Cleaning up...")
        delete_webhook(webhook["id"])
        
        print("\n✅ Complete!")
        
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error: {e.response.json() if e.response else e}")

if __name__ == "__main__":
    main()
