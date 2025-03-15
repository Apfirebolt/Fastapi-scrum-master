from typing import List
from fastapi import APIRouter, Depends, status, Response, Request
from sqlalchemy.orm import Session
from backend.auth.jwt import get_current_user
from backend.auth.models import User

from backend import db

from .import schema
from .import services


router = APIRouter(
    tags=["Task"],
    prefix='/task'
)


@router.post('/', status_code=status.HTTP_201_CREATED,
             response_model=schema.TaskBase)
async def create_new_task(request: schema.TaskBase, database: Session = Depends(db.get_db), 
    current_user: User = Depends(get_current_user)):
    user = database.query(User).filter(User.email == current_user.email).first()
    result = await services.create_new_task(request, database, user)
    return result


@router.get('/', status_code=status.HTTP_200_OK,
            response_model=List[schema.TaskList])
async def task_list(database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):
    result = await services.get_task_listing(database, current_user.id)
    return result


@router.get('/{task_id}', status_code=status.HTTP_200_OK, response_model=schema.TaskBase)
async def get_task_by_id(task_id: int, database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):                            
    return await services.get_task_by_id(task_id, current_user.id, database)


@router.delete('/{task_id}', status_code=status.HTTP_204_NO_CONTENT, response_class=Response)
async def delete_task_by_id(task_id: int,
                                database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):
    return await services.delete_task_by_id(task_id, database)


@router.patch('/{task_id}', status_code=status.HTTP_200_OK, response_model=schema.TaskBase)
async def update_task_by_id(request: schema.TaskUpdate, task_id: int, database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):                            
    return await services.update_task_by_id(request, task_id, current_user.id, database)


@router.get('/logs', status_code=status.HTTP_200_OK,
            response_model=List[schema.TaskLogBase])
async def task_log_list(database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):
    result = await services.get_task_log_listing(database, current_user.id)
    return result