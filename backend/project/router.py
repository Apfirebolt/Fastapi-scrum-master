from typing import List
from fastapi import APIRouter, Depends, File, Response, UploadFile, status
from sqlalchemy.orm import Session

from backend.auth.jwt import get_current_user
from backend.auth.models import User
from backend.db import get_db

from . import schema, services

router = APIRouter(
    prefix="/project",
    tags=["Projects"]
)


@router.post(
    "/", 
    status_code=status.HTTP_201_CREATED,
    response_model=schema.ProjectResponse,
    summary="Create a new project"
)
def create_new_project(
    request: schema.ProjectCreate, 
    database: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
) -> schema.ProjectResponse:
    return services.create_new_project(request, database, current_user)


@router.get(
    "/", 
    status_code=status.HTTP_200_OK,
    response_model=List[schema.ProjectResponse],
    summary="List all user projects"
)
def list_projects(
    database: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> List[schema.ProjectResponse]:
    return services.get_project_listing(database, current_user.id)


@router.get(
    "/{project_id}", 
    status_code=status.HTTP_200_OK, 
    response_model=schema.ProjectDetail,
    summary="Get project by ID"
)
def get_project_by_id(
    project_id: int, 
    database: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> schema.ProjectDetail:                            
    return services.get_project_by_id(project_id, current_user.id, database)


@router.delete(
    "/{project_id}", 
    status_code=status.HTTP_204_NO_CONTENT, 
    response_class=Response,
    summary="Delete a project"
)
def delete_project_by_id(
    project_id: int,
    database: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Response:
    services.delete_project_by_id(project_id, current_user.id, database)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.patch(
    "/{project_id}", 
    status_code=status.HTTP_200_OK, 
    response_model=schema.ProjectResponse,
    summary="Update project details"
)
def update_project_by_id(
    request: schema.ProjectUpdate, 
    project_id: int, 
    database: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> schema.ProjectResponse:                            
    return services.update_project_by_id(request, project_id, current_user.id, database)


# ----------------------------------------------------
# Project Image Attachment Endpoints
# ----------------------------------------------------

@router.post(
    "/{project_id}/images",
    status_code=status.HTTP_201_CREATED,
    response_model=List[schema.ProjectImageResponse],
    summary="Upload image attachments for a project",
)
def upload_project_images(
    project_id: int,
    files: List[UploadFile] = File(...),
    database: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> List[schema.ProjectImageResponse]:
    return services.upload_project_images(project_id, files, current_user.id, database)


@router.delete(
    "/{project_id}/images/{image_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,
    summary="Delete a project image attachment",
)
def delete_project_image(
    project_id: int,
    image_id: int,
    database: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Response:
    services.delete_project_image(project_id, image_id, current_user.id, database)
    return Response(status_code=status.HTTP_204_NO_CONTENT)