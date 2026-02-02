"""
Cost Katana Workflows: Monitoring & Analytics (Python)

Monitor workflow executions and analyze performance.

Run: python 17-workflows/python-sdk/workflow_monitoring.py
"""

import os
import requests

API_BASE = "https://api.costkatana.com/api"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def list_executions(status=None, limit=10):
    """List workflow executions"""
    
    params = {"limit": limit}
    if status:
        params["status"] = status
    
    response = requests.get(
        f"{API_BASE}/agent-trace/executions",
        params=params,
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    
    response.raise_for_status()
    executions = response.json()["data"].get("executions", [])
    
    print(f"📋 Found {len(executions)} executions:")
    
    for i, exec in enumerate(executions, 1):
        print(f"\n   {i}. {exec.get('workflowName', 'Workflow')}")
        print(f"      ID: {exec['executionId']}")
        print(f"      Status: {exec['status']}")
        print(f"      Duration: {exec.get('duration')}ms")
        print(f"      Cost: ${exec.get('totalCost', 0):.4f}")
    
    return executions

def get_analytics():
    """Get workflow analytics"""
    
    response = requests.get(
        f"{API_BASE}/agent-trace/analytics",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    
    response.raise_for_status()
    analytics = response.json()["data"]
    
    print("\n📊 Workflow Analytics:")
    print(f"   Total Executions: {analytics['totalExecutions']}")
    print(f"   Completed: {analytics['completedExecutions']}")
    print(f"   Failed: {analytics['failedExecutions']}")
    print(f"   Success Rate: {analytics['successRate'] * 100:.1f}%")
    print(f"   Avg Duration: {analytics['averageDuration']}ms")
    print(f"   Total Cost: ${analytics.get('totalCost', 0):.2f}")
    
    return analytics

def main():
    if not API_KEY:
        print("❌ COST_KATANA_API_KEY required")
        return
    
    print("🥷 Workflow Monitoring & Analytics (Python)\n")
    
    try:
        print("1️⃣ Recent executions:")
        list_executions(limit=5)
        
        print("\n2️⃣ Analytics:")
        get_analytics()
        
        print("\n✅ Monitoring complete!")
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error: {e.response.json() if e.response else e}")

if __name__ == "__main__":
    main()
