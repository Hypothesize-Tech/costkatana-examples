"""
Cost Katana Workflows: Create and Execute Workflows (Python)

Orchestrate multi-step AI operations with automatic orchestration.

Run: python 17-workflows/python-sdk/create_workflow.py
"""

import os
import time
import requests
from typing import Dict, List, Any

API_BASE = "https://api.costkatana.com/api"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def create_workflow_template(template: Dict[str, Any]) -> Dict:
    """Create a workflow template"""
    
    response = requests.post(
        f"{API_BASE}/workflows/templates",
        json=template,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
    )
    
    response.raise_for_status()
    data = response.json()["data"]
    
    print(f"✅ Workflow template created:")
    print(f"   ID: {data['id']}")
    print(f"   Name: {data['name']}")
    print(f"   Steps: {len(data['steps'])}")
    
    return data

def execute_workflow(template_id: str, variables: Dict[str, Any]) -> Dict:
    """Execute a workflow"""
    
    response = requests.post(
        f"{API_BASE}/workflows/templates/{template_id}/execute",
        json={"variables": variables},
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
    )
    
    response.raise_for_status()
    data = response.json()["data"]
    
    print(f"✅ Workflow execution started:")
    print(f"   Execution ID: {data['executionId']}")
    print(f"   Status: {data['status']}")
    
    return data

def get_execution_status(execution_id: str) -> Dict:
    """Get workflow execution status"""
    
    response = requests.get(
        f"{API_BASE}/workflows/executions/{execution_id}",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    
    response.raise_for_status()
    return response.json()["data"]

def wait_for_completion(execution_id: str, max_wait=60) -> Dict:
    """Wait for workflow to complete"""
    
    start_time = time.time()
    
    while time.time() - start_time < max_wait:
        status = get_execution_status(execution_id)
        
        if status["status"] == "completed":
            print("\n✅ Workflow completed successfully!")
            return status
        
        if status["status"] == "failed":
            print("\n❌ Workflow failed")
            return status
        
        elapsed = int(time.time() - start_time)
        print(f"⏳ Status: {status['status']}... ({elapsed}s)")
        time.sleep(2)
    
    raise TimeoutError("Workflow execution timeout")

def display_results(execution: Dict):
    """Display workflow results"""
    
    print("\n📊 Workflow Results:")
    print(f"   Duration: {execution['duration']}ms")
    print(f"   Total Cost: ${execution.get('totalCost', 0):.4f}")
    print(f"   Status: {execution['status']}")
    
    print("\n   Steps:")
    for i, step in enumerate(execution.get('steps', []), 1):
        print(f"   {i}. {step['name']}")
        print(f"      Status: {step['status']}")
        print(f"      Duration: {step['duration']}ms")
        print(f"      Cost: ${step.get('cost', 0):.4f}")
        if step.get('output'):
            output = str(step['output'])[:100]
            print(f"      Output: {output}...")

def document_analysis_example():
    """Example: Document analysis workflow"""
    
    print("🥷 Cost Katana Workflows: Document Analysis (Python)\n")
    
    # 1. Create template
    print("1️⃣ Creating workflow template...")
    template = {
        "name": "Document Analysis Workflow",
        "description": "Extract, analyze, and summarize documents",
        "steps": [
            {
                "id": "step_1",
                "name": "extract_text",
                "type": "ai",
                "model": "gpt-4",
                "prompt": "Extract all important information from: {{document}}",
                "output": "extracted_text"
            },
            {
                "id": "step_2",
                "name": "extract_entities",
                "type": "ai",
                "model": "gpt-4",
                "prompt": "Extract entities from: {{extracted_text}}",
                "dependsOn": ["step_1"],
                "output": "entities"
            },
            {
                "id": "step_3",
                "name": "summarize",
                "type": "ai",
                "model": "gpt-3.5-turbo",
                "prompt": "Summarize: {{extracted_text}}",
                "dependsOn": ["step_1"],
                "output": "summary"
            }
        ],
        "variables": [
            {
                "name": "document",
                "type": "string",
                "required": True
            }
        ],
        "config": {
            "maxRetries": 3,
            "retryDelay": 1000,
            "timeout": 60000
        }
    }
    
    created_template = create_workflow_template(template)
    
    # 2. Execute workflow
    print("\n2️⃣ Executing workflow...")
    execution = execute_workflow(created_template["id"], {
        "document": "John Smith works at Acme Corporation in New York. Founded in 1990, specializing in technology."
    })
    
    # 3. Wait for completion
    print("\n3️⃣ Waiting for completion...")
    result = wait_for_completion(execution["executionId"])
    
    # 4. Display results
    display_results(result)
    
    print("\n💡 Workflow Features:")
    print("   ✅ Multi-step orchestration")
    print("   ✅ Automatic dependencies")
    print("   ✅ Cost tracking")
    print("   ✅ Error handling")

def main():
    if not API_KEY:
        print("❌ COST_KATANA_API_KEY required")
        return
    
    try:
        document_analysis_example()
        print("\n✅ Workflow example complete!")
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error: {e.response.json() if e.response else e}")

if __name__ == "__main__":
    main()
