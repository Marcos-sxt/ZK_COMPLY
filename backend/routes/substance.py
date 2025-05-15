from fastapi import APIRouter, HTTPException
from schemas.base import SubstanceRequest, SubstanceResponse
from schemas.verify import VerifyRequest, VerifyResponse
from services.substance_service import generate_commitment_hash, simulate_verification
from datetime import datetime, timezone

router = APIRouter()

@router.post("/substance", response_model=SubstanceResponse)
def create_substance(data: SubstanceRequest):
  if not 2 <= data.composition <= 30: raise HTTPException(status_code=400, detail="composition must be between 2 and 30")
  hash_commitment = generate_commitment_hash(data.name, data.composition)
  return {
    "name": data.name,
    "hash": hash_commitment,
    "timestamp": datetime.now(timezone.utc)
  }

@router.post("/verify", response_model=VerifyResponse)
def verify_substance(data: VerifyRequest):
    if not 0 <= data.composition_index < 30:
      raise HTTPException(status_code=400, detail="composition_index must be between 0 and 29")
    result = simulate_verification(data.name, data.composition_index, data.threshold)
    return { "verified": result }
