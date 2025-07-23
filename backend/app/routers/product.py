from fastapi import APIRouter
from app.services.product_service import get_all_products

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/")
async def fetch_products():
    return await get_all_products()
