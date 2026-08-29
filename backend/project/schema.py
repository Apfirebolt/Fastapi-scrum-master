from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserSchema(BaseModel):
    id: int
    username: str
    email: EmailStr

    model_config = ConfigDict(from_attributes=True)


class ProjectImageResponse(BaseModel):
    id: int
    image_url: str
    image_public_id: str
    createdDate: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=5000)


class ProjectUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=5000)


class ProjectResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    owner_id: int
    createdDate: Optional[datetime] = None
    images: List[ProjectImageResponse] = []

    model_config = ConfigDict(from_attributes=True)


class ProjectDetail(ProjectResponse):
    owner: Optional[UserSchema] = None

    model_config = ConfigDict(from_attributes=True)