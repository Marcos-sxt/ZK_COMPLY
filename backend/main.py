from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Base, Substance
from database import engine, SessionLocal
from schemas.base import SubstanceRequest, SubstanceResponse
from schemas.verify import VerifyRequest, VerifyResponse
from services.substance_service import add_substance, get_all_substances, simulate_verification
import subprocess
import json
import os

app = FastAPI()

# Cria as tabelas no banco
Base.metadata.create_all(bind=engine)

# Dependência para obter sessão do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/substances/", response_model=SubstanceResponse)
def create_substance(substance: SubstanceRequest):
    return add_substance(substance.name, substance.composition)

@app.get("/substances/", response_model=list[SubstanceResponse])
def list_substances():
    return get_all_substances()

@app.post("/verify", response_model=VerifyResponse)
def verify_substance(data: VerifyRequest):
    if not 0 <= data.composition_index < 30:
        raise HTTPException(status_code=400, detail="composition_index must be between 0 and 29")
    
    success, message = simulate_verification(
        id=data.id,
        name=data.name,
        composition_index=data.composition_index,
        threshold=data.threshold
    )
    return { "verified": success, "message": message }