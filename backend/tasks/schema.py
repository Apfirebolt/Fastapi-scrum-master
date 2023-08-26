import email
from datetime import date
from typing import Optional, List
from pydantic import BaseModel, constr, EmailStr


class UserSchema(BaseModel):
    username: str
    email: EmailStr

    class Config:
        orm_mode = True


class ProjectSchema(BaseModel):
    id: int
    title: str

    class Config:
        orm_mode = True



class TaskBase(BaseModel):
    id: Optional[int]
    title: str
    description: str
    status: str
    project_id: int
    project: Optional[ProjectSchema]
    dueDate: date

    class Config:
        orm_mode = True


class TaskUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    status: Optional[str]
    project_id: Optional[int]
    dueDate: Optional[date]

    class Config:
        orm_mode = True


class TaskList(BaseModel):
    id: int
    title: str
    description: str
    status: str
    owner_id: int
    project_id: int
    project: ProjectSchema
    owner: UserSchema
    createdDate: date
    dueDate: date

    class Config:
        orm_mode = True
