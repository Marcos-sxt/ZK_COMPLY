from pydantic import BaseModel
from typing import Optional

class VerifyRequest(BaseModel):
    id: Optional[str] = None
    name: Optional[str] = None
    composition_index: int
    threshold: int

    def __init__(self, **data):
        super().__init__(**data)
        if not self.id and not self.name:
            raise ValueError("Either id or name must be provided")

class VerifyResponse(BaseModel):
    verified: bool
    message: str