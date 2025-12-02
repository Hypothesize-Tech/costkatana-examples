"""
Chat Session Recording Example in Python
Demonstrates recording AI chat conversations with Cost Katana
"""

import os
import time
from datetime import datetime
from typing import Dict, List, Optional
import requests

class SessionReplayClient:
    """Python client for Cost Katana Session Replay API"""
    
    def __init__(self, api_key: str, base_url: str = "https://api.costkatana.com"):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    
    def start_recording(self, user_id: str, feature: str, label: str, 
                       metadata: Optional[Dict] = None) -> Dict:
        """Start a new session recording"""
        url = f"{self.base_url}/api/session-replay/recording/start"
        payload = {
            "userId": user_id,
            "feature": feature,
            "label": label,
            "metadata": metadata or {}
        }
        
        response = requests.post(url, json=payload, headers=self.headers)
        response.raise_for_status()
        return response.json()["data"]
    
    def record_interaction(self, session_id: str, interaction: Dict) -> None:
        """Record an AI interaction"""
        url = f"{self.base_url}/api/session-replay/{session_id}/snapshot"
        payload = {
            "type": "interaction",
            "data": interaction
        }
        
        response = requests.post(url, json=payload, headers=self.headers)
        response.raise_for_status()
    
    def record_user_action(self, session_id: str, action: Dict) -> None:
        """Record a user action"""
        url = f"{self.base_url}/api/session-replay/{session_id}/snapshot"
        payload = {
            "type": "user_action",
            "data": action
        }
        
        response = requests.post(url, json=payload, headers=self.headers)
        response.raise_for_status()
    
    def end_recording(self, session_id: str) -> None:
        """End a recording session"""
        url = f"{self.base_url}/api/session-replay/{session_id}/end"
        response = requests.post(url, headers=self.headers)
        response.raise_for_status()
    
    def get_session_replay(self, session_id: str) -> Dict:
        """Get a session replay"""
        url = f"{self.base_url}/api/session-replay/{session_id}"
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()["data"]


class ChatSession:
    """Manages a chat session with AI interaction recording"""
    
    def __init__(self, user_id: str, replay_client: SessionReplayClient):
        self.user_id = user_id
        self.replay_client = replay_client
        self.session_id: Optional[str] = None
        self.messages: List[Dict] = []
    
    def start(self, label: Optional[str] = None) -> str:
        """Start a new chat session"""
        label = label or f"Chat - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        
        result = self.replay_client.start_recording(
            user_id=self.user_id,
            feature="chat",
            label=label,
            metadata={
                "platform": "python",
                "version": "1.0.0"
            }
        )
        
        self.session_id = result["sessionId"]
        print(f"✅ Chat session started: {self.session_id}")
        
        # Record session start action
        self._record_action("session_started")
        
        return self.session_id
    
    def send_message(self, message: str, model: str = "gpt-4") -> str:
        """Send a message and record the AI interaction"""
        if not self.session_id:
            raise ValueError("Chat session not started. Call start() first.")
        
        # Record user action
        self._record_action("send_message", {"message": message})
        
        # Simulate AI call (replace with actual AI SDK call)
        start_time = time.time()
        response = self._call_ai(model, message)
        latency = int((time.time() - start_time) * 1000)  # Convert to milliseconds
        
        # Add to message history
        self.messages.extend([
            {"role": "user", "content": message},
            {
                "role": "assistant",
                "content": response["text"],
                "model": model,
                "tokens": response["tokens"],
                "cost": response["cost"]
            }
        ])
        
        # Record the AI interaction
        self.replay_client.record_interaction(
            session_id=self.session_id,
            interaction={
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "model": model,
                "prompt": message,
                "response": response["text"],
                "tokens": response["tokens"],
                "cost": response["cost"],
                "latency": latency,
                "provider": "openai",
                "parameters": {
                    "temperature": 0.7,
                    "max_tokens": 500
                },
                "requestMetadata": {
                    "messageCount": len(self.messages),
                    "contextLength": self._get_context_length()
                },
                "responseMetadata": {
                    "finish_reason": response["finish_reason"]
                }
            }
        )
        
        print(f"💬 Message recorded - Cost: ${response['cost']:.4f}, "
              f"Tokens: {response['tokens']['input'] + response['tokens']['output']}")
        
        return response["text"]
    
    def _record_action(self, action: str, metadata: Optional[Dict] = None) -> None:
        """Record a user action"""
        if not self.session_id:
            return
        
        self.replay_client.record_user_action(
            session_id=self.session_id,
            action={
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "action": action,
                "metadata": metadata or {}
            }
        )
    
    def _get_context_length(self) -> int:
        """Get total context length"""
        return sum(len(msg["content"]) for msg in self.messages)
    
    def _call_ai(self, model: str, prompt: str) -> Dict:
        """Simulate AI call (replace with actual implementation)"""
        # This is a mock - replace with actual AI SDK call
        # Example: OpenAI, Anthropic, AWS Bedrock, etc.
        
        import random
        
        input_tokens = len(prompt) // 4
        output_tokens = random.randint(50, 150)
        
        return {
            "text": f"This is a mock response to: {prompt[:50]}...",
            "tokens": {
                "input": input_tokens,
                "output": output_tokens
            },
            "cost": input_tokens * 0.00003 + output_tokens * 0.00006,
            "finish_reason": "stop"
        }
    
    def end(self) -> Dict:
        """End the chat session"""
        if not self.session_id:
            return {}
        
        self._record_action("session_ended")
        self.replay_client.end_recording(self.session_id)
        
        total_cost = sum(msg.get("cost", 0) for msg in self.messages)
        
        print(f"✅ Chat session ended: {self.session_id}")
        print(f"   Messages: {len(self.messages)}")
        print(f"   Total cost: ${total_cost:.4f}")
        
        session_id = self.session_id
        self.session_id = None
        
        return {
            "sessionId": session_id,
            "messageCount": len(self.messages),
            "totalCost": total_cost
        }
    
    def get_stats(self) -> Optional[Dict]:
        """Get session statistics"""
        if not self.session_id:
            return None
        
        replay = self.replay_client.get_session_replay(self.session_id)
        
        return {
            "sessionId": replay["sessionId"],
            "duration": replay.get("duration"),
            "interactionCount": len(replay["replayData"]["aiInteractions"]),
            "totalCost": replay["summary"]["totalCost"],
            "totalTokens": (
                replay["summary"]["totalTokens"]["input"] +
                replay["summary"]["totalTokens"]["output"]
            ),
            "errorCount": replay.get("errorCount", 0)
        }


def main():
    """Example usage"""
    # Initialize the replay client
    api_key = os.getenv("COST_KATANA_API_KEY")
    if not api_key:
        raise ValueError("COST_KATANA_API_KEY environment variable not set")
    
    replay_client = SessionReplayClient(api_key=api_key)
    
    # Create a chat session
    chat = ChatSession(user_id="user_12345", replay_client=replay_client)
    
    try:
        # Start recording
        chat.start("Customer Support - Billing Question")
        
        # Send messages
        chat.send_message("Hello! I have a question about my bill.")
        chat.send_message("Can you explain the charges for last month?")
        chat.send_message("Thank you for the help!")
        
        # Get statistics
        stats = chat.get_stats()
        print("\n📊 Session Stats:")
        for key, value in stats.items():
            print(f"   {key}: {value}")
        
        # End recording
        chat.end()
        
    except Exception as e:
        print(f"❌ Error in chat session: {e}")
        raise


if __name__ == "__main__":
    main()

