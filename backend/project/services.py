from fastapi import HTTPException, status
from typing import List
from . import models
from datetime import datetime


async def create_new_project(request, database, current_user) -> models.Project:
    new_project = models.Project(title=request.title, description=request.description,
                                    owner_id=current_user.id, createdDate=datetime.now())
    database.add(new_project)
    database.commit()
    database.refresh(new_project)
    return new_project


async def get_project_listing(database, current_user) -> List[models.Project]:
    projects = database.query(models.Project).filter(models.Project.owner_id == current_user).all()
    return projects


async def get_project_by_id(project_id, current_user, database):
    project = database.query(models.Project).filter_by(id=project_id, owner_id=current_user).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="project Not Found !"
        )
    return project


async def delete_project_by_id(project_id, database):
    database.query(models.Project).filter(
        models.Project.id == project_id).delete()
    database.commit()


async def update_project_by_id(request, project_id, current_user, database):
    project = database.query(models.Project).filter_by(id=project_id, owner_id=current_user).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="project Not Found !"
        )
    project.title = request.title if request.title else project.title
    project.description = request.description if request.description else project.description
    database.commit()
    database.refresh(project)
    return project
