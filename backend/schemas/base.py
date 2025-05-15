from pydantic import BaseModel, Field
from typing import List, Annotated
from datetime import datetime

class SubstanceRequest(BaseModel):
  name: str
  composition: Annotated[List[int], Field(min_length=2, max_length=30)]

class SubstanceResponse(BaseModel):
  id: str
  name: str
  composition: List[int]
  hash_commitment: str
  timestamp: datetime
