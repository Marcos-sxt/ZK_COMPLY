from fastapi import APIRouter, HTTPException
from schemas.base import SubstanceRequest, SubstanceResponse
from schemas.verify import VerifyRequest, VerifyResponse
from services.noir_service import run_noir_proof
from datetime import datetime, timezone

router = APIRouter()

@router.post("/substances/", response_model=SubstanceResponse)
def create_substance(data: SubstanceRequest):
  if not 2 <= len(data.composition) <= 30: raise HTTPException(status_code=400, detail="composition must be between 2 and 30")
  substance = add_substance(data.name, data.composition)
  return substance

@router.post("/verify", response_model=VerifyResponse)
def verify_substance(data: VerifyRequest):
    """
    Verify a substance composition using ZK proofs.
    The client must provide:
    - composition: The full composition array
    - composition_index: The index to verify
    - threshold: The threshold value to check against
    - hash_commitment: The hash commitment of the composition
    """
    if not 0 <= data.composition_index < 30:
        raise HTTPException(status_code=400, detail="composition_index must be between 0 and 29")
    
    if not 2 <= len(data.composition) <= 30:
        raise HTTPException(status_code=400, detail="composition must be between 2 and 30 elements")
    
    success, message = run_noir_proof(
        composition=data.composition,
        composition_index=data.composition_index,
        threshold=data.threshold,
        hash_commitment=data.hash_commitment
    )
    
    return { "verified": success, "message": message }

@router.get("/substances")
def list_substances():
    return get_all_substances()

@router.get("/substances/{name}")
def find_substance(name: str):
    result = get_substance_by_id(name)
    if not result:
        raise HTTPException(status_code=404, detail="Substance not found")
    return result

@router.get("/substances/{id}")
def find_substance(id: str):
    result = get_substance_by_id(id)
    if not result:
        raise HTTPException(status_code=404, detail="Substance not found")
    return result