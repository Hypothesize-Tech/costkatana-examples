"""
Cost Katana Workflows: Control Operations (Python)

Pause, resume, and cancel workflow executions.

Run: python 17-workflows/python-sdk/workflow_control.py
"""

import os
import requests

API_BASE = "https://cost-katana-backend.store/api"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def pause_workflow(execution_id: str):
    """Pause a running workflow"""
    
    response = requests.post(
        f"{API_BASE}/workflows/executions/{execution_id}/pause",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    
    response.raise_for_status()
    print("⏸️  Workflow paused")
    return response.json()["data"]

def resume_workflow(execution_id: str):
    """Resume a paused workflow"""
    
    response = requests.post(
        f"{API_BASE}/workflows/executions/{execution_id}/resume",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    
    response.raise_for_status()
    print("▶️  Workflow resumed")
    return response.json()["data"]

def cancel_workflow(execution_id: str):
    """Cancel a workflow"""
    
    response = requests.post(
        f"{API_BASE}/workflows/executions/{execution_id}/cancel",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    
    response.raise_for_status()
    print("⛔ Workflow cancelled")
    return response.json()["data"]

def main():
    if not API_KEY:
        print("❌ COST_KATANA_API_KEY required")
        return
    
    print("🥷 Workflow Control Operations (Python)\n")
    
    print("💡 Available operations:")
    print("\n   pause_workflow(execution_id)")
    print("   - Pauses after current step")
    print("   - State preserved")
    
    print("\n   resume_workflow(execution_id)")
    print("   - Continues from paused state")
    print("   - No data loss")
    
    print("\n   cancel_workflow(execution_id)")
    print("   - Stops immediately")
    print("   - Cannot resume")

if __name__ == "__main__":
    main()
