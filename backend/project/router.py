from typing import List
from fastapi import APIRouter, Depends, status, Response, Request
from sqlalchemy.orm import Session
from backend.auth.jwt import get_current_user
from backend.auth.models import User

from backend import db

from .import schema
from .import services


router = APIRouter(
    tags=["Project"],
    prefix='/project'
)


@router.post('/', status_code=status.HTTP_201_CREATED,
             response_model=schema.ProjectBase)
async def create_new_project(request: schema.ProjectBase, database: Session = Depends(db.get_db), 
    current_user: User = Depends(get_current_user)):
    user = database.query(User).filter(User.email == current_user.email).first()
    result = await services.create_new_project(request, database, user)
    return result


@router.get('/', status_code=status.HTTP_200_OK,
            response_model=List[schema.ProjectList])
async def project_list(database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):
    result = await services.get_project_listing(database, current_user.id)
    return result


@router.get('/{project_id}', status_code=status.HTTP_200_OK, response_model=schema.ProjectBase)
async def get_project_by_id(project_id: int, database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):                            
    return await services.get_project_by_id(project_id, current_user.id, database)


@router.delete('/{project_id}', status_code=status.HTTP_204_NO_CONTENT, response_class=Response)
async def delete_project_by_id(project_id: int,
                                database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):
    return await services.delete_project_by_id(project_id, database)


@router.patch('/{project_id}', status_code=status.HTTP_200_OK, response_model=schema.ProjectBase)
async def update_project_by_id(request: schema.ProjectUpdate, project_id: int, database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):                            
    return await services.update_project_by_id(request, project_id, current_user.id, database)
