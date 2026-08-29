import email
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, constr, EmailStr


class UserSchema(BaseModel):
    username: str
    email: EmailStr

    class Config:
        from_attributes = True


class ProjectSchema(BaseModel):
    id: int
    title: str

    class Config:
        from_attributes = True



class TaskBase(BaseModel):
    id: Optional[int]
    title: str
    description: str
    status: str
    project_id: int
    project: Optional[ProjectSchema]
    dueDate: datetime

    class Config:
        from_attributes = True


class TaskUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    status: Optional[str]
    project_id: Optional[int]
    dueDate: Optional[datetime]

    class Config:
        from_attributes = True


class TaskList(BaseModel):
    id: int
    title: str
    description: str
    status: str
    owner_id: int
    project_id: int
    project: ProjectSchema
    owner: UserSchema
    createdDate: datetime
    dueDate: datetime

    class Config:
        from_attributes = True


class TaskLogBase(BaseModel):
    id: int
    createdDate: datetime
    task_id: int
    task: Optional[TaskBase]

    class Config:
        from_attributes = True
