from fastapi import HTTPException, status
from typing import List
from datetime import datetime

from backend.auth.models import User
from backend.tasks.models import Task
from backend.tasks import services as taskServices
from backend.auth import services as userServices


async def get_user_by_id(user_id, database):
    user = database.query(User).filter_by(id=user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User Not Found !"
        )
    return user


async def delete_user_by_id(user_id, database):
    database.query(User).filter(
        User.id == user_id).delete()
    database.commit()


async def update_user_by_id(request, user_id, database):
    user = database.query(User).filter_by(id=user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User Not Found !"
        )
    user.firstName = request.firstName if request.firstName else user.firstName
    user.lastName = request.lastName if request.lastName else user.lastName
    database.commit()
    database.refresh(user)
    return user






