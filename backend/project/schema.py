from datetime import date, datetime
from typing import Optional, List
from pydantic import BaseModel, constr, EmailStr


class UserSchema(BaseModel):
    username: str
    email: EmailStr

    class Config:
        from_attributes = True


class ProjectBase(BaseModel):
    id: Optional[int]
    title: str
    description: str
    
    class Config:
        from_attributes = True


class ProjectUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    status: Optional[str]

    class Config:
        from_attributes = True


class ProjectList(BaseModel):
    id: int
    title: str
    description: str
    owner_id: int
    owner: UserSchema
    createdDate: datetime

    class Config:
        from_attributes = True
