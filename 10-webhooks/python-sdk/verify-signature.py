"""
Cost Katana Webhooks: Signature Verification (Python)

Utility functions for verifying webhook signatures.

Usage:
    from verify_signature import verify_webhook_signature
    
    is_valid = verify_webhook_signature(payload, signature, secret)
"""

import hmac
import hashlib
import time
from typing import Union

def verify_webhook_signature(
    payload: Union[str, bytes],
    signature: str,
    secret: str
) -> bool:
    """
    Verify Cost Katana webhook signature.
    
    Args:
        payload: Webhook payload (raw bytes or string)
        signature: X-CostKatana-Signature header value
        secret: Your webhook secret
    
    Returns:
        True if signature is valid, False otherwise
    """
    try:
        # Parse signature header
        parts = signature.split(',')
        timestamp_part = parts[0]
        signature_part = parts[1]
        
        timestamp = int(timestamp_part.split('=')[1])
        received_signature = signature_part.split('=')[1]
        
        # Check timestamp freshness (prevent replay attacks)
        current_time = int(time.time())
        tolerance = 300  # 5 minutes
        
        if abs(current_time - timestamp) > tolerance:
            print(f"❌ Timestamp too old: {abs(current_time - timestamp)}s")
            return False
        
        # Convert payload to string if bytes
        if isinstance(payload, bytes):
            payload = payload.decode('utf-8')
        
        # Construct signed payload
        signed_payload = f"{timestamp}.{payload}"
        
        # Compute expected signature
        expected_signature = hmac.new(
            secret.encode('utf-8'),
            signed_payload.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()
        
        # Timing-safe comparison
        is_valid = hmac.compare_digest(
            received_signature,
            expected_signature
        )
        
        if not is_valid:
            print("❌ Signature mismatch")
        
        return is_valid
        
    except Exception as e:
        print(f"❌ Verification error: {e}")
        return False

def generate_test_signature(payload: str, secret: str) -> str:
    """Generate a test signature for testing purposes"""
    timestamp = int(time.time())
    signed_payload = f"{timestamp}.{payload}"
    
    signature = hmac.new(
        secret.encode('utf-8'),
        signed_payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return f"t={timestamp},v1={signature}"

def main():
    """Example usage"""
    print("🥷 Webhook Signature Verification (Python)\n")
    
    # Test signature verification
    test_secret = "your_webhook_secret"
    test_payload = '{"event_type":"cost.alert","data":{"cost":100}}'
    
    # Generate test signature
    signature = generate_test_signature(test_payload, test_secret)
    print(f"Generated signature: {signature}\n")
    
    # Verify it
    is_valid = verify_webhook_signature(test_payload, signature, test_secret)
    print(f"Verification result: {'✅ Valid' if is_valid else '❌ Invalid'}")
    
    print("\n💡 Usage in Flask:")
    print("""
    from flask import Flask, request
    from verify_signature import verify_webhook_signature
    
    @app.route('/webhooks', methods=['POST'])
    def webhook():
        signature = request.headers.get('X-CostKatana-Signature')
        payload = request.data
        
        if not verify_webhook_signature(payload, signature, SECRET):
            return {'error': 'Invalid signature'}, 401
        
        # Process webhook...
        return {'received': True}, 200
    """)

if __name__ == "__main__":
    main()
