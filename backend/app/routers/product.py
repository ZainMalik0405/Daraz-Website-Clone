from bson import ObjectId
from fastapi import APIRouter, HTTPException
from pymongo.errors import PyMongoError
from app.services.db import products_collection, review_collection
from app.models.review_model import Review
from fastapi import Form, File, UploadFile
from datetime import datetime
import os

router = APIRouter()

@router.get("/products/flash-sale")
async def get_flash_sale_products():
    products = await products_collection.find(
        {"discount_percent": {"$gt": 0}}
    ).sort("discount_percent", -1).to_list(length=6)

    for product in products:
        product["_id"] = str(product["_id"])  # Convert ObjectId to string

    return {"products": products}

@router.get("/products/flash-sale-all")
async def get_flash_sale_products():
    products = await products_collection.find(
        {"discount_percent": {"$gt": 0}}
    ).sort("discount_percent", -1).to_list(length=30)

    for product in products:
        product["_id"] = str(product["_id"])  # Convert ObjectId to string

    return {"products": products}

@router.get("/products/{product_id}")
async def get_product(product_id: str):
    try:
        # ✅ Validate ObjectId format first
        if not ObjectId.is_valid(product_id):
            raise HTTPException(status_code=400, detail="Invalid ObjectId format")

        product = await products_collection.find_one({"_id": ObjectId(product_id)})

        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        product["_id"] = str(product["_id"])  # Convert ObjectId for frontend
        return product

    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")

@router.post("/reviews")
async def add_review(review: Review):
    review_dict = review.dict()
    await review_collection.insert_one(review_dict)

    # Fetch all reviews for this product
    reviews = await review_collection.find({"product_id": review.product_id}).to_list(length=1000)

    # Calculate new average rating and count
    total_reviews = len(reviews)
    avg_rating = round(sum(r["rating"] for r in reviews) / total_reviews, 1)

    # Update product document
    await products_collection.update_one(
        {"_id": ObjectId(review.product_id)},
        {"$set": {
            "review_count": total_reviews,
            "rating": avg_rating
        }}
    )

    return {"message": "Review added", "review_count": total_reviews, "rating": avg_rating}


@router.get("/reviews/{product_id}")
async def get_reviews(product_id: str):
    reviews = await review_collection.find({
        "product_id": product_id  # stored as string, so no ObjectId conversion needed
    }).to_list(length=100)

    return [
        {
            "_id": str(r["_id"]),
            "product_id": r["product_id"],
            "user": r["user"],
            "rating": r["rating"],
            "comment": r.get("comment"),
            "timestamp": r["timestamp"].isoformat() if r.get("timestamp") else None
        }
        for r in reviews
    ]