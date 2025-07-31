from app.services.db import db
from app.models.product import Product

async def get_all_products():
    products_cursor = db.products.find()
    return [Product(**product) async for product in products_cursor]
