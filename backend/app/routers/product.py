from fastapi import APIRouter
from app.services.db import products_collection

router = APIRouter()

@router.get("/products/flash-sale")
async def get_flash_sale_products():
    products = await products_collection.find(
        {"discount_percent": {"$gt": 60}}
    ).sort("discount_percent", -1).to_list(length=20)

    for product in products:
        product["_id"] = str(product["_id"])  # Convert ObjectId to string

    return {"products": products}
