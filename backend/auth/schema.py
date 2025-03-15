import email
from typing import Optional, List
from pydantic import BaseModel, EmailStr


class User(BaseModel):
    username: str
    email: EmailStr
    firstName: str
    lastName: str
    password: str

    
class DisplayAccount(BaseModel):
    id: int
    username: str
    email: str
    firstName: Optional[str]
    lastName: Optional[str]
   

    class Config:
        orm_mode = True


class UserUpdate(BaseModel):
    username: Optional[str]
    email: Optional[EmailStr]
    firstName: Optional[str]
    lastName: Optional[str]
    password: Optional[str]
    

class Login(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
    id: Optional[int]