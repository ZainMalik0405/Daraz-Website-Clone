from pydantic import BaseModel, Field
class AdminUser(BaseModel):
    username: str
    password: str