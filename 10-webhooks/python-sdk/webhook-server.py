"""
Cost Katana Webhooks: Flask Webhook Receiver (Python)

Example Flask server that receives and verifies Cost Katana webhooks.

Run: python 10-webhooks/python-sdk/webhook-server.py
"""

import os
import hmac
import hashlib
import time
from flask import Flask, request, jsonify

app = Flask(__name__)
WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET", "your_webhook_secret")

def verify_signature(payload: bytes, signature: str) -> bool:
    """Verify webhook signature"""
    try:
        parts = signature.split(',')
        timestamp = int(parts[0].split('=')[1])
        received_sig = parts[1].split('=')[1]
        
        # Check timestamp (prevent replay attacks)
        current_time = int(time.time())
        if abs(current_time - timestamp) > 300:  # 5 minutes
            print("❌ Timestamp too old")
            return False
        
        # Compute expected signature
        signed_payload = f"{timestamp}.{payload.decode('utf-8')}"
        expected_sig = hmac.new(
            WEBHOOK_SECRET.encode('utf-8'),
            signed_payload.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()
        
        # Timing-safe comparison
        return hmac.compare_digest(received_sig, expected_sig)
        
    except Exception as e:
        print(f"❌ Verification error: {e}")
        return False

@app.route('/webhooks/cost-alerts', methods=['POST'])
def handle_webhook():
    """Handle incoming webhooks"""
    
    # Verify signature
    signature = request.headers.get('X-CostKatana-Signature')
    if not signature:
        return jsonify({"error": "No signature"}), 401
    
    if not verify_signature(request.data, signature):
        return jsonify({"error": "Invalid signature"}), 401
    
    # Process event
    event = request.json
    print(f"\n✅ Verified webhook received:")
    print(f"   Event: {event['event_type']}")
    print(f"   Severity: {event['data']['severity']}")
    print(f"   Title: {event['data']['title']}")
    
    # Handle different event types
    if event['event_type'] == 'cost.alert':
        handle_cost_alert(event)
    elif event['event_type'] == 'budget.exceeded':
        handle_budget_exceeded(event)
    
    return jsonify({"received": True}), 200

def handle_cost_alert(event):
    """Handle cost alert event"""
    cost = event['data']['cost']
    print(f"💰 Cost Alert: ${cost['amount']} exceeds ${cost.get('threshold', 0)}")
    # Send notification, trigger action, etc.

def handle_budget_exceeded(event):
    """Handle budget exceeded event"""
    budget = event['data'].get('budget', {})
    print(f"⚠️ Budget Exceeded: {budget.get('percentUsed', 0)}%")
    # Send urgent notification, throttle requests, etc.

if __name__ == '__main__':
    print("🥷 Cost Katana Webhook Receiver\n")
    print(f"   Listening on http://localhost:5000")
    print(f"   Endpoint: POST /webhooks/cost-alerts\n")
    app.run(host='0.0.0.0', port=5000, debug=True)
