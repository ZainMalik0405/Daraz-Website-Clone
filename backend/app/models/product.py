from pydantic import BaseModel, Field
from typing import Optional, List

class Product(BaseModel):
    name: str
    description: Optional[str] = None  # Includes specifications
    price: float
    discount_percent: Optional[float] = None
    discounted_price: Optional[float] = None  # ✅ Calculated on backend
    image_urls: Optional[List[str]] = []  # ✅ Supports multiple images
    category: Optional[str] = None
    quantity: int = 0
    rating: Optional[float] = 0.0  # ✅ Will be calculated from reviews
    review_count: Optional[int] = 0
    is_flash_sale: Optional[bool] = False
    tags: Optional[List[str]] = []