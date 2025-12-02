"""
Cost Katana OpenTelemetry: Distributed Tracing (Python)

Trace requests across multiple microservices.

Run: python 11-observability/python-sdk/distributed-trace.py
"""

import os
import uuid
import requests

GATEWAY_URL = "https://api.costkatana.com/api/gateway/v1/chat/completions"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def generate_trace_id():
    """Generate W3C trace ID (128-bit hex)"""
    return uuid.uuid4().hex + uuid.uuid4().hex[:16]

def generate_span_id():
    """Generate W3C span ID (64-bit hex)"""
    return uuid.uuid4().hex[:16]

def microservice_flow():
    """Demonstrate distributed tracing across microservices"""
    
    print("🥷 Microservice Distributed Tracing (Python)\n")
    
    session_id = f"microservice_{uuid.uuid4().hex[:8]}"
    trace_id = generate_trace_id()
    
    # Service A: API Gateway
    print("1️⃣ Service A (API Gateway)")
    r_a = requests.post(
        GATEWAY_URL,
        json={
            "model": "gpt-4",
            "messages": [{"role": "user", "content": "Process request"}]
        },
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "X-Session-Id": session_id,
            "X-Service-Name": "api-gateway",
            "traceparent": f"00-{trace_id}-{generate_span_id()}-01",
            "baggage": "user_id=user123,tenant_id=tenant456"
        }
    )
    r_a.raise_for_status()
    print(f"   ✅ Trace ID: {r_a.headers.get('X-Trace-Id')}")
    
    # Service B: Business Logic (child of A)
    print("\n2️⃣ Service B (Business Logic)")
    r_b = requests.post(
        GATEWAY_URL,
        json={
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": "Apply rules"}]
        },
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "X-Session-Id": session_id,
            "X-Parent-Trace-Id": r_a.headers.get("X-Trace-Id"),
            "X-Service-Name": "business-logic",
            "traceparent": f"00-{trace_id}-{generate_span_id()}-01",
            "baggage": "user_id=user123,tenant_id=tenant456"
        }
    )
    r_b.raise_for_status()
    print(f"   ✅ Trace ID: {r_b.headers.get('X-Trace-Id')}")
    
    # Service C: Data Processing (child of B)
    print("\n3️⃣ Service C (Data Processing)")
    r_c = requests.post(
        GATEWAY_URL,
        json={
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": "Process data"}]
        },
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "X-Session-Id": session_id,
            "X-Parent-Trace-Id": r_b.headers.get("X-Trace-Id"),
            "X-Service-Name": "data-processor",
            "traceparent": f"00-{trace_id}-{generate_span_id()}-01",
            "baggage": "user_id=user123,tenant_id=tenant456"
        }
    )
    r_c.raise_for_status()
    print(f"   ✅ Trace ID: {r_c.headers.get('X-Trace-Id')}")
    
    print(f"\n✅ Microservice flow traced end-to-end!")
    print(f"   Session: {session_id}")
    print(f"   W3C Trace: {trace_id}")

def main():
    if not API_KEY:
        print("❌ COST_KATANA_API_KEY required")
        return
    
    try:
        microservice_flow()
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error: {e.response.json() if e.response else e}")

if __name__ == "__main__":
    main()
