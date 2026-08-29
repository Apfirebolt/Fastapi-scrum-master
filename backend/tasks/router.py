from typing import List
from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from backend.auth.jwt import get_current_user
from backend.auth.models import User
from backend.db import get_db

from . import schema, services

router = APIRouter(
    prefix="/task",
    tags=["Task"]
)


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=schema.TaskBase,
    summary="Create a new task"
)
def create_new_task(
    request: schema.TaskCreate,
    database: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> schema.TaskBase:
    return services.create_new_task(request, database, current_user)


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=List[schema.TaskList],
    summary="List all user tasks"
)
def task_list(
    database: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> List[schema.TaskList]:
    return services.get_task_listing(database, current_user.id)


# Placed BEFORE /{task_id} to avoid route shadowing
@router.get(
    "/logs",
    status_code=status.HTTP_200_OK,
    response_model=List[schema.TaskLogBase],
    summary="List all task logs"
)
def task_log_list(
    database: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> List[schema.TaskLogBase]:
    return services.get_task_log_listing(database, current_user.id)


@router.get(
    "/{task_id}",
    status_code=status.HTTP_200_OK,
    response_model=schema.TaskList,
    summary="Get task by ID"
)
def get_task_by_id(
    task_id: int,
    database: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> schema.TaskList:
    return services.get_task_by_id(task_id, current_user.id, database)


@router.delete(
    "/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,
    summary="Delete a task"
)
def delete_task_by_id(
    task_id: int,
    database: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Response:
    services.delete_task_by_id(task_id, current_user.id, database)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.patch(
    "/{task_id}",
    status_code=status.HTTP_200_OK,
    response_model=schema.TaskBase,
    summary="Update a task"
)
def update_task_by_id(
    request: schema.TaskUpdate,
    task_id: int,
    database: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> schema.TaskBase:
    return services.update_task_by_id(request, task_id, current_user.id, database)