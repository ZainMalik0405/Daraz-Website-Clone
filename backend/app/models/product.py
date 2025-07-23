from pydantic import BaseModel, Field
from typing import Optional

class Product(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    image_url: Optional[str] = None
    category: Optional[str] = None
    quantity: int = 0