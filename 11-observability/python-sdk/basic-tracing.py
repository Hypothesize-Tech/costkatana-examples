"""
Cost Katana OpenTelemetry: Basic Distributed Tracing (Python)

Track AI requests across services with distributed tracing.

Run: python 11-observability/python-sdk/basic-tracing.py
"""

import os
import uuid
import requests

API_BASE = "https://cost-katana-backend.store/api"
GATEWAY_URL = f"{API_BASE}/gateway/v1/chat/completions"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def basic_traced_request():
    """Make a traced AI request"""
    
    session_id = f"session_{uuid.uuid4().hex[:8]}"
    
    print(f"1️⃣ Making traced request...")
    print(f"   Session ID: {session_id}")
    
    response = requests.post(
        GATEWAY_URL,
        json={
            "model": "gpt-4",
            "messages": [
                {"role": "user", "content": "Explain distributed tracing"}
            ]
        },
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "X-Session-Id": session_id,
            "X-Service-Name": "my-python-app"
        }
    )
    
    response.raise_for_status()
    
    trace_id = response.headers.get("X-Trace-Id")
    duration = response.headers.get("X-Request-Duration")
    cost = response.headers.get("X-Cost")
    
    print(f"✅ Request traced:")
    print(f"   Trace ID: {trace_id}")
    print(f"   Duration: {duration}")
    print(f"   Cost: ${cost}")
    
    return {
        "session_id": session_id,
        "trace_id": trace_id,
        "cost": cost
    }

def multi_request_session():
    """Track multiple requests in a session"""
    
    session_id = f"multi_session_{uuid.uuid4().hex[:8]}"
    
    print(f"\n2️⃣ Multi-request session...")
    print(f"   Session ID: {session_id}")
    
    traces = []
    
    # Request 1
    print("\n   Request 1: Extract entities...")
    r1 = requests.post(
        GATEWAY_URL,
        json={
            "model": "gpt-4",
            "messages": [{"role": "user", "content": "Extract entities..."}]
        },
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "X-Session-Id": session_id,
            "X-Span-Name": "entity_extraction"
        }
    )
    r1.raise_for_status()
    traces.append({
        "operation": "entity_extraction",
        "trace_id": r1.headers.get("X-Trace-Id"),
        "cost": r1.headers.get("X-Cost")
    })
    
    # Request 2 (child of Request 1)
    print("   Request 2: Classify sentiment...")
    r2 = requests.post(
        GATEWAY_URL,
        json={
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": "Classify sentiment..."}]
        },
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "X-Session-Id": session_id,
            "X-Parent-Trace-Id": r1.headers.get("X-Trace-Id"),
            "X-Span-Name": "sentiment_classification"
        }
    )
    r2.raise_for_status()
    traces.append({
        "operation": "sentiment_classification",
        "trace_id": r2.headers.get("X-Trace-Id"),
        "parent_id": r1.headers.get("X-Trace-Id"),
        "cost": r2.headers.get("X-Cost")
    })
    
    total_cost = sum(float(t["cost"] or 0) for t in traces)
    
    print(f"\n✅ Session complete:")
    print(f"   Total traces: {len(traces)}")
    print(f"   Total cost: ${total_cost:.4f}")
    
    return traces

def view_session_trace(session_id):
    """Retrieve and display session trace"""
    
    print(f"\n3️⃣ Viewing session trace: {session_id}")
    
    response = requests.get(
        f"{API_BASE}/v1/sessions/{session_id}",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    
    response.raise_for_status()
    session = response.json()
    
    print(f"✅ Session trace:")
    print(f"   Total Traces: {len(session.get('traces', []))}")
    print(f"   Total Cost: ${session.get('totalCost', 0)}")
    print(f"   Total Duration: {session.get('totalDuration', 0)}ms")
    
    if session.get('traces'):
        print("\n   Trace Hierarchy:")
        for trace in session['traces']:
            indent = "   └─" if trace.get('parentId') else "   ├─"
            print(f"{indent} {trace.get('operation', 'request')}")
            print(f"      Trace ID: {trace.get('traceId')}")
            print(f"      Duration: {trace.get('duration')}ms")
            print(f"      Cost: ${trace.get('cost')}")
    
    return session

def main():
    if not API_KEY:
        print("❌ COST_KATANA_API_KEY required")
        return
    
    print("🥷 Cost Katana OpenTelemetry: Basic Tracing (Python)\n")
    
    try:
        # Run examples
        result = basic_traced_request()
        multi_request_session()
        view_session_trace(result["session_id"])
        
        print("\n✅ All tracing examples complete!")
        print("\n💡 Benefits:")
        print("   • Track requests across services")
        print("   • Monitor AI performance")
        print("   • Debug with full context")
        print("   • Attribute costs accurately")
        
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error: {e.response.json() if e.response else e}")

if __name__ == "__main__":
    main()
