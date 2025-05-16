import hashlib
import json
import os
from datetime import datetime
from typing import List
from uuid import uuid4

DB_PATH = "data/substances.json"

def generate_commitment_hash(name: str, composition: List[int]) -> str:
    fake_string = name + ''.join(map(str, composition))
    return hashlib.sha256(fake_string.encode()).hexdigest()

def load_db() -> List[dict]:
    if not os.path.exists(DB_PATH):
        return []
    with open(DB_PATH, "r") as f:
        return json.load(f)

def save_db(data: List[dict]):
    with open(DB_PATH, "w") as f:
        json.dump(data, f, default=str, indent=2)

def add_substance(name: str, composition: List[int]) -> dict:
    db = load_db()
    substance = {
        "id": str(uuid4()),
        "name": name,
        "composition": composition,
        "hash_commitment": generate_commitment_hash(name, composition),
        "timestamp": datetime.utcnow().isoformat()
    }
    db.append(substance)
    save_db(db)
    return substance

def get_all_substances() -> List[dict]:
    return load_db()

def get_substance_by_name(name: str) -> List[dict]:
    db = load_db()
    return [s for s in db if s["name"].lower() == name.lower()]

def get_substance_by_id(id: str) -> dict:
  db = load_db()
  for substance in db:
    if substance["id"] == id:
      return substance
  return None

def simulate_verification(name: str, composition_index: int, threshold: int) -> bool:
    return True  # mock
