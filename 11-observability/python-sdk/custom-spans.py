"""
Cost Katana OpenTelemetry: Custom Spans (Python)

Create custom spans with business context.

Run: python 11-observability/python-sdk/custom-spans.py
"""

import os
import json
import uuid
import requests

GATEWAY_URL = "https://api.costkatana.com/api/gateway/v1/chat/completions"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def document_processing_pipeline():
    """Process document with custom spans"""
    
    session_id = f"doc_pipeline_{uuid.uuid4().hex[:8]}"
    
    print("🥷 Document Processing Pipeline with Custom Spans\n")
    
    # Span 1: Document extraction
    print("1️⃣ Extracting text from document...")
    r1 = requests.post(
        GATEWAY_URL,
        json={
            "model": "gpt-4",
            "messages": [{"role": "user", "content": "Extract text..."}]
        },
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "X-Session-Id": session_id,
            "X-Span-Name": "document_extraction",
            "X-Span-Attributes": json.dumps({
                "document_type": "pdf",
                "page_count": 25,
                "file_size_mb": 3.2,
                "language": "en"
            })
        }
    )
    r1.raise_for_status()
    print(f"   ✅ Complete ({r1.headers.get('X-Request-Duration')})")
    
    # Span 2: Entity recognition
    print("2️⃣ Recognizing entities...")
    r2 = requests.post(
        GATEWAY_URL,
        json={
            "model": "gpt-4",
            "messages": [{"role": "user", "content": "Identify entities..."}]
        },
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "X-Session-Id": session_id,
            "X-Parent-Trace-Id": r1.headers.get("X-Trace-Id"),
            "X-Span-Name": "entity_recognition",
            "X-Span-Attributes": json.dumps({
                "entity_types": ["person", "organization", "location"],
                "confidence_threshold": 0.85
            })
        }
    )
    r2.raise_for_status()
    print(f"   ✅ Complete ({r2.headers.get('X-Request-Duration')})")
    
    print(f"\n✅ Pipeline complete! Session: {session_id}")

def main():
    if not API_KEY:
        print("❌ COST_KATANA_API_KEY required")
        return
    
    try:
        document_processing_pipeline()
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error: {e.response.json() if e.response else e}")

if __name__ == "__main__":
    main()
