from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Review(BaseModel):
    product_id: str
    user: str
    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str]
    timestamp: datetime = Field(default_factory=datetime.utcnow)
