from pydantic import BaseModel, Field
from typing import Optional, List
class User(BaseModel):
    id: str
    name: str
    email: str
    password: str
    phone: Optional[str]
    address: Optional[str]
