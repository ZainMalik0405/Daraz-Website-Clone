from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["daraz_clone"]
products_collection = db["products"]

async def seed_products():
    products = [
        {
            "name": "TWS I12 M19 Airpods",
            "description": "[Super Bass HD Sound][Latest Bluetooth V5.0 Chip EDR/BLE +Noise Reduction][Barrier Free Transmission + Intelligent Compatibility][Light Weight+ Safe to Wear][Stereo Surround Sound + High-Quality Integrated Audio Chip][Button less + touch Control][Improved Battery Performance]Weight: 100g / full setDisplay: system battery displayLink: You can link two Bluetooth devices at the same timeBluetooth version: V4.2Play music / talk time: about 3-4 hoursStandby time: about 100 hoursBattery Type: Rechargeable Polymer Lithium BatteryFunction: fast charging, high-definition callVoice: can switch between Chinese and English, linked to the state under the press 2 under the boot buttonChip: CSR63120 top chip.",
            "price": 1999,
            "discount_percent": 69,
            "discounted_price": 621,
            "image_urls": ["https://tse3.mm.bing.net/th/id/OIP.1cEKBF_dNEwCutG9hdqS0AHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3","https://p.globalsources.com/IMAGES/PDT/B1183739829/earpods-i12.jpg","https://5.imimg.com/data5/SELLER/Default/2022/4/XL/AU/BB/47542481/954bcb5a-986c-45eb-ba13-3b14c54cf62c-500x500.jpg"],
            "category": "Electronics",
            "quantity": 50,
            "rating": 4.5,
            "review_count": 120,
            "tags": ["earbuds", "wireless"]
        }
    ]

    await products_collection.insert_many(products)

asyncio.run(seed_products())
