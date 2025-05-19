import json
import os
from datetime import datetime
from typing import List, Tuple
from uuid import uuid4
from .noir_service import run_noir_proof
from .utils import normalize_composition, generate_commitment_hash

DB_PATH = "data/substances.json"

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
    normalized = normalize_composition(composition)
    substance = {
        "id": str(uuid4()),
        "name": name,
        "composition": normalized,
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

def simulate_verification(id: str = None, name: str = None, composition_index: int = None, threshold: int = None) -> Tuple[bool, str]:
    # Get the substance from the database
    substance = None
    if id:
        substance = get_substance_by_id(id)
    elif name:
        substances = get_substance_by_name(name)
        if substances:
            substance = substances[0]
    
    if not substance:
        return False, "Substance not found"
        
    # Run the Noir proof verification
    success, message = run_noir_proof(
        substance["composition"],
        composition_index,
        threshold
    )
    
    return success, message
