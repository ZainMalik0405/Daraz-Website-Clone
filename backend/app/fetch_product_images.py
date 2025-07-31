import asyncio
import aiohttp
from motor.motor_asyncio import AsyncIOMotorClient

PEXELS_API_KEY = "8lKon1qwB2gjpfUazaRqPJPpvQu8luznsRoJC6j1CKyvLmrVeUv1QJO1"
HEADERS = {"Authorization": PEXELS_API_KEY}
PEXELS_API_URL = "https://api.pexels.com/v1/search"

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["daraz_clone"]
products_collection = db["products"]

async def fetch_image_urls(session, query):
    params = {"query": query, "per_page": 3}
    async with session.get(PEXELS_API_URL, headers=HEADERS, params=params) as resp:
        data = await resp.json()
        photos = data.get("photos", [])
        return [photo["src"]["medium"] for photo in photos]

async def update_product_images():
    products = await products_collection.find().to_list(length=100)

    async with aiohttp.ClientSession() as session:
        tasks = []
        for product in products:
            query = product["name"]
            tasks.append(fetch_image_urls(session, query))

        all_image_lists = await asyncio.gather(*tasks)

        for product, image_urls in zip(products, all_image_lists):
            await products_collection.update_one(
                {"_id": product["_id"]},
                {"$set": {"image_urls": image_urls}}
            )
            print(f"Updated: {product['name']} with {len(image_urls)} images")

    print("✅ All products updated with new image URLs from Pexels!")

if __name__ == "__main__":
    asyncio.run(update_product_images())
