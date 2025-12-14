from openai import OpenAI
from rag_engine import search_all_sources
import os

# Initialize client here, not inside the function
API_KEY = os.getenv("openai_api_key")
if not API_KEY:
    raise RuntimeError("openai_api_key not set")

client = OpenAI(api_key=API_KEY)

def chat(user_message: str):
    match = search_all_sources(user_message)
        
    if match:
        #return match["text"]
        return {
            "reply": match["text"],
            "source": match["source"],
            "confidence": round(match["score"], 2)
        }

    # Fallback to GPT
    resp = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            { "role": "system","content": "You are a helpful company assistant."},
            { "role": "user", "content": user_message }
        ]
    )

    #return resp.choices[0].message.content  # Return just the string

    return {
        "reply": resp.choices[0].message.content,
        "source": "gpt",
        "confidence": 1.0
    }
