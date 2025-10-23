"""
Cost Katana Workflows: FastAPI Integration

Integrate workflows into FastAPI endpoints.
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import os

app = FastAPI()

API_BASE = "https://cost-katana-backend.store/api"
API_KEY = os.getenv("COST_KATANA_API_KEY")

class WorkflowExecuteRequest(BaseModel):
    templateId: str
    variables: dict

@app.post("/api/workflows/execute")
async def execute_workflow(request: WorkflowExecuteRequest):
    """Execute a workflow"""
    
    try:
        response = requests.post(
            f"{API_BASE}/workflows/templates/{request.templateId}/execute",
            json={"variables": request.variables},
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json"
            }
        )
        
        response.raise_for_status()
        
        return {
            "success": True,
            "execution": response.json()["data"]
        }
        
    except requests.exceptions.HTTPError as e:
        raise HTTPException(
            status_code=500,
            detail=e.response.json() if e.response else str(e)
        )

@app.get("/api/workflows/executions/{execution_id}")
async def get_execution(execution_id: str):
    """Get workflow execution status"""
    
    try:
        response = requests.get(
            f"{API_BASE}/workflows/executions/{execution_id}",
            headers={"Authorization": f"Bearer {API_KEY}"}
        )
        
        response.raise_for_status()
        
        return {
            "success": True,
            "execution": response.json()["data"]
        }
        
    except requests.exceptions.HTTPError as e:
        raise HTTPException(
            status_code=500,
            detail=e.response.json() if e.response else str(e)
        )

@app.post("/api/workflows/executions/{execution_id}/{action}")
async def control_workflow(execution_id: str, action: str):
    """Control workflow execution (pause/resume/cancel)"""
    
    if action not in ["pause", "resume", "cancel"]:
        raise HTTPException(status_code=400, detail="Invalid action")
    
    try:
        response = requests.post(
            f"{API_BASE}/workflows/executions/{execution_id}/{action}",
            headers={"Authorization": f"Bearer {API_KEY}"}
        )
        
        response.raise_for_status()
        
        return {
            "success": True,
            "data": response.json()["data"]
        }
        
    except requests.exceptions.HTTPError as e:
        raise HTTPException(
            status_code=500,
            detail=e.response.json() if e.response else str(e)
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
