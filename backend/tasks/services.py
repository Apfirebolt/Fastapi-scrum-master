from fastapi import HTTPException, status
from typing import List
from . import models
from datetime import datetime


async def create_new_task(request, database, current_user) -> models.Task:
    new_task = models.Task(title=request.title, description=request.description, status=request.status,
                                    owner_id=current_user.id, createdDate=datetime.now())
    database.add(new_task)
    database.commit()
    database.refresh(new_task)
    return new_task


async def get_task_listing(database, current_user) -> List[models.Task]:
    tasks = database.query(models.Task).filter(models.Task.owner_id == current_user).all()
    return tasks


async def get_task_by_id(task_id, current_user, database):
    task = database.query(models.Task).filter_by(id=task_id, owner_id=current_user).first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="task Not Found !"
        )
    return task


async def delete_task_by_id(task_id, database):
    database.query(models.Task).filter(
        models.Task.id == task_id).delete()
    database.commit()


async def update_task_by_id(request, task_id, current_user, database):
    task = database.query(models.Task).filter_by(id=task_id, owner_id=current_user).first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="task Not Found !"
        )
    task.title = request.title if request.title else task.title
    task.description = request.description if request.description else task.description
    task.status = request.status if request.status else task.status
    database.commit()
    database.refresh(task)
    return task






