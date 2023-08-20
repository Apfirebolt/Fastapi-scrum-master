from datetime import date
from typing import Optional, List
from pydantic import BaseModel, constr, EmailStr


class UserSchema(BaseModel):
    username: str
    email: EmailStr

    class Config:
        orm_mode = True


class ProjectBase(BaseModel):
    id: Optional[int]
    title: str
    description: str
    
    class Config:
        orm_mode = True


class ProjectUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    status: Optional[str]

    class Config:
        orm_mode = True


class ProjectList(BaseModel):
    id: int
    title: str
    description: str
    owner_id: int
    owner: UserSchema
    createdDate: date

    class Config:
        orm_mode = True
