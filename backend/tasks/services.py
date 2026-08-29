from datetime import datetime, timezone
from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from backend.auth.models import User
from . import models, schema


def create_new_task(
    task_in: schema.TaskCreate, 
    database: Session, 
    current_user: User
) -> models.Task:
    new_task = models.Task(
        title=task_in.title,
        description=task_in.description,
        status=task_in.status,
        project_id=task_in.project_id,
        owner_id=current_user.id,
        dueDate=task_in.dueDate,
        createdDate=datetime.now(timezone.utc),
    )
    database.add(new_task)
    database.commit()
    database.refresh(new_task)

    # Automatically record creation log
    task_log = models.TaskLog(
        task_id=new_task.id,
        createdDate=datetime.now(timezone.utc),
    )
    database.add(task_log)
    database.commit()

    return new_task


def get_task_listing(
    database: Session, 
    owner_id: int
) -> List[models.Task]:
    stmt = (
        select(models.Task)
        .options(
            joinedload(models.Task.project),
            joinedload(models.Task.owner),
        )
        .where(models.Task.owner_id == owner_id)
        .order_by(models.Task.id.desc())
    )
    return list(database.scalars(stmt).unique().all())


def get_task_by_id(
    task_id: int, 
    owner_id: int, 
    database: Session
) -> models.Task:
    stmt = (
        select(models.Task)
        .options(
            joinedload(models.Task.project),
            joinedload(models.Task.owner),
        )
        .where(
            models.Task.id == task_id, 
            models.Task.owner_id == owner_id
        )
    )
    task = database.scalars(stmt).unique().first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with ID {task_id} not found."
        )
    return task


def delete_task_by_id(
    task_id: int, 
    owner_id: int, 
    database: Session
) -> None:
    task = get_task_by_id(task_id, owner_id, database)
    database.delete(task)
    database.commit()


def update_task_by_id(
    task_in: schema.TaskUpdate, 
    task_id: int, 
    owner_id: int, 
    database: Session
) -> models.Task:
    task = get_task_by_id(task_id, owner_id, database)

    # Apply partial updates
    update_data = task_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)

    # Record update log
    task_log = models.TaskLog(
        task_id=task.id,
        createdDate=datetime.now(timezone.utc),
    )
    database.add(task_log)

    database.commit()
    database.refresh(task)
    return task


def get_task_log_listing(
    database: Session, 
    owner_id: int
) -> List[models.TaskLog]:
    stmt = (
        select(models.TaskLog)
        .join(models.Task, models.TaskLog.task_id == models.Task.id)
        .options(joinedload(models.TaskLog.task))
        .where(models.Task.owner_id == owner_id)
        .order_by(models.TaskLog.createdDate.desc())
    )
    return list(database.scalars(stmt).unique().all())