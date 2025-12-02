"""
Cost Katana OpenTelemetry: Metrics Collection (Python)

Collect and monitor OpenTelemetry metrics.

Run: python 11-observability/python-sdk/metrics.py
"""

import os
import requests

API_BASE = "https://api.costkatana.com/api"
API_KEY = os.getenv("COST_KATANA_API_KEY")

def collect_prometheus_metrics():
    """Fetch Prometheus metrics"""
    
    print("1️⃣ Fetching Prometheus metrics...")
    
    response = requests.get(
        f"{API_BASE}/metrics",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    
    response.raise_for_status()
    
    print("✅ Prometheus metrics (sample):")
    lines = response.text.split('\n')[:10]
    for line in lines:
        if line and not line.startswith('#'):
            print(f"   {line}")

def collect_telemetry_summary():
    """Fetch telemetry summary"""
    
    print("\n2️⃣ Fetching telemetry summary...")
    
    response = requests.get(
        f"{API_BASE}/telemetry",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    
    response.raise_for_status()
    data = response.json()
    
    metrics = data.get('metrics', {})
    
    print("✅ Current metrics:")
    print(f"   Requests/min: {metrics.get('requests_per_minute', 0)}")
    print(f"   Avg Latency: {metrics.get('average_latency_ms', 0)}ms")
    print(f"   Error Rate: {metrics.get('error_rate', 0) * 100}%")
    print(f"   Cost/hour: ${metrics.get('cost_per_hour', 0)}")

def main():
    if not API_KEY:
        print("❌ COST_KATANA_API_KEY required")
        return
    
    print("🥷 Cost Katana Metrics Collection (Python)\n")
    
    try:
        collect_prometheus_metrics()
        collect_telemetry_summary()
        
        print("\n✅ Metrics collection complete!")
        
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error: {e.response.json() if e.response else e}")

if __name__ == "__main__":
    main()
