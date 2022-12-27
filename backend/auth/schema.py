import email
from typing import Optional, List
from pydantic import BaseModel, constr, EmailStr


class User(BaseModel):
    username: constr(min_length=2, max_length=50)
    email: EmailStr
    role: Optional[str]
    firstName: str
    lastName: str
    password: str

class UserUpdate(BaseModel):
    firstName: Optional[str]
    lastName: Optional[str]
    
class DisplayAccount(BaseModel):
    id: int
    username: str
    email: str
    firstName: Optional[str]
    lastName: Optional[str]

    class Config:
        orm_mode = True


class Login(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
    id: Optional[int]