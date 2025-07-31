from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import product, auth, ping

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],  # frontend URL (adjust if needed)
    allow_credentials=True,
    allow_methods=["*"],  # OPTIONS, POST, GET, etc.
    allow_headers=["*"],
)

app.include_router(ping.router)
app.include_router(product.router)
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "Daraz 8025 is up!"}


