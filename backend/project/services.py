from typing import List, Optional
from datetime import datetime, timezone
from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.auth.models import User
from . import models, schema


def create_new_project(
    project_in: schema.ProjectCreate, 
    database: Session, 
    current_user: User
) -> models.Project:
    new_project = models.Project(
        title=project_in.title,
        description=project_in.description,
        owner_id=current_user.id,
        createdDate=datetime.now(timezone.utc)
    )
    database.add(new_project)
    database.commit()
    database.refresh(new_project)
    return new_project


def get_project_listing(
    database: Session, 
    owner_id: int
) -> List[models.Project]:
    stmt = select(models.Project).where(models.Project.owner_id == owner_id)
    return list(database.scalars(stmt).all())


def get_project_by_id(
    project_id: int, 
    owner_id: int, 
    database: Session
) -> models.Project:
    stmt = select(models.Project).where(
        models.Project.id == project_id, 
        models.Project.owner_id == owner_id
    )
    project = database.scalars(stmt).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID {project_id} not found."
        )
    return project


def delete_project_by_id(
    project_id: int, 
    owner_id: int, 
    database: Session
) -> None:
    project = get_project_by_id(project_id, owner_id, database)
    database.delete(project)
    database.commit()


def update_project_by_id(
    project_in: schema.ProjectUpdate, 
    project_id: int, 
    owner_id: int, 
    database: Session
) -> models.Project:
    project = get_project_by_id(project_id, owner_id, database)
    
    update_data = project_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(project, field, value)

    database.commit()
    database.refresh(project)
    return project