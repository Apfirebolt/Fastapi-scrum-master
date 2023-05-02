from fastapi import HTTPException, status
from typing import List

from backend.auth.models import User
from backend.tasks.models import Task
from backend.tasks import services as taskServices
from backend.auth import services as userServices
from backend.auth.schema import DisplayAccount


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


async def all_users(database) -> List[DisplayAccount]:
    users = database.query(User).all()
    return users

async def all_tasks(database) -> List[Task]:
    tasks = database.query(Task).all()
    return tasks


async def get_task_by_id(task_id, database):
    task = database.query(User).filter_by(id=task_id).first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task Not Found !"
        )
    return task


async def delete_task_by_id(task_id, database):
    database.query(Task).filter(
        Task.id == task_id).delete()
    database.commit()


async def update_task_by_id(request, task_id, database):
    task = database.query(Task).filter_by(id=task_id).first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task Not Found !"
        )
    task.title = request.title if request.title else task.title
    task.description = request.description if request.description else task.description
    task.status = request.status if request.status else task.status
    database.commit()
    database.refresh(task)
    return task






