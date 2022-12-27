from fastapi import APIRouter, Depends, status, Response, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend import db
from backend.auth import schema
from backend.auth import services
from backend.tasks import services as taskServices
from backend.admin import services as adminServices
from backend.tasks import schema as taskSchema 
from backend.auth.jwt import get_current_user


from backend.auth.models import User

router = APIRouter(tags=['Admin'], prefix='/admin')


@router.get('/users', response_model=List[schema.DisplayAccount])
async def get_all_users(database: Session = Depends(db.get_db), current_user: User = Depends(get_current_user)):
    user = database.query(User).filter(User.email == current_user.email).first()
    if user.role != 'admin':
        raise HTTPException(status_code=403, detail="Only admins are allowed to perform this action")
    return await services.all_users(database)


@router.get('/users/{user_id}', status_code=status.HTTP_200_OK, response_model=schema.DisplayAccount)
async def get_user_by_id(user_id: int, database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):                            
    user = database.query(User).filter(User.email == current_user.email).first()
    if user.role != 'admin':
        raise HTTPException(status_code=403, detail="Only admins are allowed to perform this action")
    return await adminServices.get_user_by_id(user_id, database)


@router.delete('/users/{user_id}', status_code=status.HTTP_204_NO_CONTENT, response_class=Response)
async def delete_user_by_id(user_id: int,
                                database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):
    user = database.query(User).filter(User.email == current_user.email).first()
    if user.role != 'admin':
        raise HTTPException(status_code=403, detail="Only admins are allowed to perform this action")
    return await adminServices.delete_user_by_id(user_id, database)


@router.patch('/users/{user_id}', status_code=status.HTTP_200_OK, response_model=schema.DisplayAccount)
async def update_user_by_id(request: schema.UserUpdate, user_id: int, database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):

    user = database.query(User).filter(User.email == current_user.email).first()
    if user.role != 'admin':
        raise HTTPException(status_code=403, detail="Only admins are allowed to perform this action")                            
    return await adminServices.update_user_by_id(request, user_id, database)
















