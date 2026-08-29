from typing import List, Dict
from fastapi import HTTPException, status
from sqlalchemy import select, delete
from sqlalchemy.orm import Session

from backend.auth.models import User
from backend.tasks.models import Task
from backend.auth import schema as auth_schema
from backend.tasks import schema as task_schema


# ----------------------------------------------------
# User Services
# ----------------------------------------------------

def get_user_by_id(user_id: int, database: Session) -> User:
    user = database.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with ID {user_id} not found."
        )
    return user


def delete_user_by_id(user_id: int, database: Session) -> None:
    user = get_user_by_id(user_id, database)
    database.delete(user)
    database.commit()


def update_user_by_id(
    request: auth_schema.UserUpdate, 
    user_id: int, 
    database: Session
) -> User:
    user = get_user_by_id(user_id, database)

    update_data = request.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)

    database.commit()
    database.refresh(user)
    return user


def all_users(database: Session) -> List[User]:
    stmt = select(User).order_by(User.id.asc())
    return list(database.scalars(stmt).all())


# ----------------------------------------------------
# Task Services
# ----------------------------------------------------

def all_tasks(database: Session) -> List[Task]:
    stmt = select(Task).order_by(Task.id.desc())
    return list(database.scalars(stmt).all())


def get_task_by_id(task_id: int, database: Session) -> Task:
    task = database.get(Task, task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with ID {task_id} not found."
        )
    return task


def delete_task_by_id(task_id: int, database: Session) -> None:
    task = get_task_by_id(task_id, database)
    database.delete(task)
    database.commit()


def delete_all_tasks(database: Session) -> Dict[str, str]:
    stmt = delete(Task)
    database.execute(stmt)
    database.commit()
    return {"message": "All tasks successfully deleted"}


def update_task_by_id(
    request: task_schema.TaskUpdate, 
    task_id: int, 
    database: Session
) -> Task:
    task = get_task_by_id(task_id, database)

    update_data = request.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)

    database.commit()
    database.refresh(task)
    return task