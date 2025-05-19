from pydantic import BaseModel, Field
from typing import List

class VerifyRequest(BaseModel):
    composition: List[int] = Field(..., description="The full composition array")
    composition_index: int = Field(..., description="The index to verify", ge=0, lt=30)
    threshold: int = Field(..., description="The threshold value to check against")
    hash_commitment: int = Field(..., description="The hash commitment of the composition")

    def __init__(self, **data):
        super().__init__(**data)
        if not self.composition and not self.hash_commitment:
            raise ValueError("Either composition or hash_commitment must be provided")

class VerifyResponse(BaseModel):
    verified: bool
    message: str