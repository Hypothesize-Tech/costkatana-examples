"""
Cost Katana Webhooks: Cost & Budget Alerts (Python)

Monitor costs and budgets with real-time webhook notifications.

Run: python 10-webhooks/python-sdk/cost-alerts.py
"""

import os
import requests

API_BASE_URL = "https://cost-katana-backend.store/api"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def setup_cost_alerts(webhook_url: str):
    """Set up comprehensive cost alert webhook"""
    
    response = requests.post(
        f"{API_BASE_URL}/webhooks",
        json={
            "name": "Comprehensive Cost Alerts",
            "url": webhook_url,
            "events": [
                "cost.alert",
                "cost.threshold_exceeded",
                "cost.spike_detected",
                "budget.warning",
                "budget.exceeded"
            ],
            "description": "Monitor all cost events",
            "active": True,
            "secret": os.getenv("WEBHOOK_SECRET"),
            "filters": {
                "severity": ["high", "critical"]
            }
        },
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
    )
    
    response.raise_for_status()
    webhook = response.json()["webhook"]
    
    print(f"✅ Cost alerts webhook created: {webhook['id']}")
    print(f"   Monitoring {len(webhook['events'])} event types")
    
    return webhook

def main():
    if not API_KEY:
        print("❌ COST_KATANA_API_KEY required")
        return
    
    print("🥷 Cost Alerts Webhook (Python)\n")
    
    try:
        webhook = setup_cost_alerts("https://your-server.com/webhooks/cost")
        print("\n✅ Cost monitoring active!")
        print("\n💡 You'll receive alerts for:")
        print("   • Cost threshold exceeded")
        print("   • Budget warnings (75%, 90%)")
        print("   • Budget exceeded")
        print("   • Cost spikes detected")
        
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error: {e.response.json() if e.response else e}")

if __name__ == "__main__":
    main()
