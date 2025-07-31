import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
