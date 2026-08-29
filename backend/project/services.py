from datetime import datetime, timezone
from typing import List
from fastapi import HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from backend.auth.models import User
from backend.utils.cloudinary import upload_image, delete_image
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
        createdDate=datetime.now(timezone.utc),
    )
    database.add(new_project)
    database.commit()
    database.refresh(new_project)
    return new_project


def get_project_listing(
    database: Session, 
    owner_id: int
) -> List[models.Project]:
    stmt = (
        select(models.Project)
        .options(joinedload(models.Project.images))
        .where(models.Project.owner_id == owner_id)
        .order_by(models.Project.id.desc())
    )
    return list(database.scalars(stmt).unique().all())


def get_project_by_id(
    project_id: int, 
    owner_id: int, 
    database: Session
) -> models.Project:
    stmt = (
        select(models.Project)
        .options(
            joinedload(models.Project.images),
            joinedload(models.Project.owner),
        )
        .where(
            models.Project.id == project_id, 
            models.Project.owner_id == owner_id
        )
    )
    project = database.scalars(stmt).unique().first()
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

    # Clean up all related Cloudinary assets before deleting project record
    for img in project.images:
        if img.image_public_id:
            delete_image(img.image_public_id)

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


def upload_project_images(
    project_id: int,
    files: List[UploadFile],
    owner_id: int,
    database: Session,
) -> List[models.ProjectImage]:
    project = get_project_by_id(project_id, owner_id, database)

    uploaded_records: List[models.ProjectImage] = []
    for file in files:
        upload_result = upload_image(file, folder=f"projects/{project.id}")
        image_record = models.ProjectImage(
            image_url=upload_result["image_url"],
            image_public_id=upload_result["image_public_id"],
            project_id=project.id,
            createdDate=datetime.now(timezone.utc),
        )
        database.add(image_record)
        uploaded_records.append(image_record)

    database.commit()
    for rec in uploaded_records:
        database.refresh(rec)

    return uploaded_records


def delete_project_image(
    project_id: int,
    image_id: int,
    owner_id: int,
    database: Session,
) -> None:
    # Validate project ownership
    _ = get_project_by_id(project_id, owner_id, database)

    image = database.get(models.ProjectImage, image_id)
    if not image or image.project_id != project_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Image with ID {image_id} not found in this project.",
        )

    # Delete asset from Cloudinary
    delete_image(image.image_public_id)

    # Delete database record
    database.delete(image)
    database.commit()