from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["daraz_clone"]
users_collection = db["users"]
products_collection = db["products"]
review_collection = db["reviews"]