from fastapi import APIRouter, HTTPException
from schemas.base import SubstanceRequest, SubstanceResponse
from schemas.verify import VerifyRequest, VerifyResponse
from services.substance_service import generate_commitment_hash, simulate_verification
from datetime import datetime

router = APIRouter()

@router.post("/substance", response_model=SubstanceResponse)
def create_substance(data: SubstanceRequest):
  hash_commitment = generate_commitment_hash(data.name, data.composition)
  return {
    "name": data.name,
    "hash": hash_commitment,
    "timestamp": datetime.utcnow()
  }

@router.post("/verify", response_model=VerifyResponse)
def verify_substance(data: VerifyRequest):
    if not 0 <= data.composition_index < 30:
      raise HTTPException(status_code=400, detail="composition_index must be between 0 and 29")
    result = simulate_verification(data.name, data.composition_index, data.threshold)
    return { "verified": result }
