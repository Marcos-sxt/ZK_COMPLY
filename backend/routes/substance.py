from fastapi import APIRouter, HTTPException
from schemas.base import SubstanceRequest, SubstanceResponse
from schemas.verify import VerifyRequest, VerifyResponse
from services.substance_service import (
    add_substance,
    get_all_substances,
    get_substance_by_id,
    simulate_verification
)
from datetime import datetime, timezone

router = APIRouter()

@router.post("/substance", response_model=SubstanceResponse)
def create_substance(data: SubstanceRequest):
  if not 2 <= len(data.composition) <= 30: raise HTTPException(status_code=400, detail="composition must be between 2 and 30")
  substance = add_substance(data.name, data.composition)
  return substance

@router.post("/verify", response_model=VerifyResponse)
def verify_substance(data: VerifyRequest):
    if not 0 <= data.composition_index < 30:
      raise HTTPException(status_code=400, detail="composition_index must be between 0 and 29")
    result = simulate_verification(data.name, data.composition_index, data.threshold)
    return { "verified": result }

@router.get("/substances")
def list_substances():
    return get_all_substances()

@router.get("/substances/{id}")
def find_substance(id: str):
    result = get_substance_by_id(id)
    if not result:
        raise HTTPException(status_code=404, detail="Substance not found")
    return result