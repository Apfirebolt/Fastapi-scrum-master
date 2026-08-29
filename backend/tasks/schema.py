from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserSchema(BaseModel):
    id: int
    username: str
    email: EmailStr

    model_config = ConfigDict(from_attributes=True)


class ProjectSchema(BaseModel):
    id: int
    title: str

    model_config = ConfigDict(from_attributes=True)


class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=5000)
    status: str = Field(default="To Do", max_length=50)
    project_id: Optional[int] = None
    dueDate: Optional[datetime] = None


class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=5000)
    status: Optional[str] = Field(None, max_length=50)
    project_id: Optional[int] = None
    dueDate: Optional[datetime] = None


class TaskBase(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    status: str
    dueDate: Optional[datetime] = None
    createdDate: Optional[datetime] = None
    owner_id: int
    project_id: Optional[int] = None
    project: Optional[ProjectSchema] = None

    model_config = ConfigDict(from_attributes=True)


class TaskList(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    status: str
    owner_id: int
    project_id: Optional[int] = None
    project: Optional[ProjectSchema] = None
    owner: Optional[UserSchema] = None
    createdDate: Optional[datetime] = None
    dueDate: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class TaskLogBase(BaseModel):
    id: int
    createdDate: Optional[datetime] = None
    task_id: int
    task: Optional[TaskBase] = None

    model_config = ConfigDict(from_attributes=True)