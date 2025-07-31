from pydantic import BaseModel, Field
from typing import Optional, List
class User(BaseModel):
    name: str
    email: str
    password: str
    phone: str
    address: Optional[List[str]] = []
