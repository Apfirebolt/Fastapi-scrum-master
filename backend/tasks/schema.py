import email
from datetime import date
from typing import Optional, List
from pydantic import BaseModel, constr, EmailStr


class UserSchema(BaseModel):
    username: str
    email: EmailStr

    class Config:
        orm_mode = True


class TaskBase(BaseModel):
    id: Optional[int]
    title: str
    description: str
    status: str

    class Config:
        orm_mode = True


class TaskUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    status: Optional[str]

    class Config:
        orm_mode = True


class TaskList(BaseModel):
    id: int
    title: str
    description: str
    status: str
    owner_id: int
    owner: UserSchema
    createdDate: Optional[date]

    class Config:
        orm_mode = True
