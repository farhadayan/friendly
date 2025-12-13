import os
import json
import numpy as np
from openai import OpenAI

# ------------------ CONFIG ------------------
EMB_MODEL = "text-embedding-3-small"

DATA_DIR = "data"
STORE_DIR = "embeddings"

SOURCES = {
    "company": "company_data.txt",
    "support": "itsupport.txt",
    "software": "software.txt",
    "dataengineering": "dataengineering.txt",
}

# ------------------ CLIENT ------------------
API_KEY = os.getenv("openai_api_key")
if not API_KEY:
    raise RuntimeError("openai_api_key not set")

client = OpenAI(api_key=API_KEY)

# ------------------ UTILS ------------------
def embed(text: str):
    resp = client.embeddings.create(
        model=EMB_MODEL,
        input=text
    )
    return resp.data[0].embedding


def cosine(a, b):
    a = np.array(a)
    b = np.array(b)
    if np.linalg.norm(a) == 0 or np.linalg.norm(b) == 0:
        return 0.0
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

# ------------------ LOAD STORE ------------------
def load_source(source: str, filename: str):
    os.makedirs(STORE_DIR, exist_ok=True)
    store_file = os.path.join(STORE_DIR, f"{source}.json")

    # Load cached embeddings
    if os.path.exists(store_file):
        try:
            with open(store_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                print(f"Loaded {source} embeddings ({len(data)})")
                return data
        except Exception:
            os.remove(store_file)

    # Build embeddings
    path = os.path.join(DATA_DIR, filename)
    if not os.path.exists(path):
        return []

    with open(path, "r", encoding="utf-8") as f:
        lines = [l.strip() for l in f if l.strip()]

    store = []
    for line in lines:
        store.append({
            "text": line,
            "embedding": embed(line)
        })

    with open(store_file, "w", encoding="utf-8") as f:
        json.dump(store, f, indent=2, ensure_ascii=False)

    print(f"Generated {source} embeddings ({len(store)})")
    return store

# ------------------ INIT ALL STORES ------------------
EMBEDDING_STORES = {
    source: load_source(source, file)
    for source, file in SOURCES.items()
}

# ------------------ SEARCH ------------------
def search_all_sources(query: str, threshold=0.7):
    q_emb = embed(query)

    best = {
        "source": None,
        "text": None,
        "score": 0.0
    }

    for source, store in EMBEDDING_STORES.items():
        for item in store:
            score = cosine(q_emb, item["embedding"])
            if score > best["score"]:
                best.update({
                    "source": source,
                    "text": item["text"],
                    "score": score
                })

    if best["score"] >= threshold:
        return best
    return None

