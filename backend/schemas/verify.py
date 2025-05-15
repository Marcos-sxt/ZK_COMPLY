from pydantic import BaseModel

class VerifyRequest(BaseModel):
  name: str
  composition_index: int
  threshold: int

class VerifyResponse(BaseModel):
  verified: bool