from typing import List, Dict
from fastapi import APIRouter, Depends, status, Response, HTTPException
from sqlalchemy.orm import Session

from backend import db
from backend.auth import schema as auth_schema
from backend.tasks import schema as task_schema
from backend.admin import services as admin_services
from backend.auth.jwt import get_current_user
from backend.auth.models import User

router = APIRouter(tags=["Admin"], prefix="/admin")


def require_admin_user(current_user: User = Depends(get_current_user)) -> User:
    """Dependency to verify authenticated user has admin privileges."""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins are allowed to perform this action",
        )
    return current_user


# ----------------------------------------------------
# User Management Endpoints
# ----------------------------------------------------

@router.get(
    "/users",
    status_code=status.HTTP_200_OK,
    response_model=List[auth_schema.UserResponse],
    summary="List all users (Admin)",
)
def get_all_users(
    database: Session = Depends(db.get_db),
    _: User = Depends(require_admin_user),
) -> List[auth_schema.UserResponse]:
    return admin_services.all_users(database)


@router.get(
    "/users/{user_id}",
    status_code=status.HTTP_200_OK,
    response_model=auth_schema.UserResponse,
    summary="Get user by ID (Admin)",
)
def get_user_by_id(
    user_id: int,
    database: Session = Depends(db.get_db),
    _: User = Depends(require_admin_user),
) -> auth_schema.UserResponse:
    return admin_services.get_user_by_id(user_id, database)


@router.delete(
    "/users/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,
    summary="Delete user by ID (Admin)",
)
def delete_user_by_id(
    user_id: int,
    database: Session = Depends(db.get_db),
    _: User = Depends(require_admin_user),
) -> Response:
    admin_services.delete_user_by_id(user_id, database)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.patch(
    "/users/{user_id}",
    status_code=status.HTTP_200_OK,
    response_model=auth_schema.UserResponse,
    summary="Update user by ID (Admin)",
)
def update_user_by_id(
    request: auth_schema.UserUpdate,
    user_id: int,
    database: Session = Depends(db.get_db),
    _: User = Depends(require_admin_user),
) -> auth_schema.UserResponse:
    return admin_services.update_user_by_id(request, user_id, database)


# ----------------------------------------------------
# Task Management Endpoints
# ----------------------------------------------------

@router.get(
    "/tasks",
    status_code=status.HTTP_200_OK,
    response_model=List[task_schema.TaskBase],
    summary="List all tasks (Admin)",
)
def get_all_tasks(
    database: Session = Depends(db.get_db),
    _: User = Depends(require_admin_user),
) -> List[task_schema.TaskBase]:
    return admin_services.all_tasks(database)


@router.delete(
    "/tasks/delete",
    status_code=status.HTTP_200_OK,
    summary="Delete all tasks (Admin)",
)
def delete_all_tasks(
    database: Session = Depends(db.get_db),
    _: User = Depends(require_admin_user),
) -> Dict[str, str]:
    return admin_services.delete_all_tasks(database)


@router.get(
    "/tasks/{task_id}",
    status_code=status.HTTP_200_OK,
    response_model=task_schema.TaskBase,
    summary="Get task by ID (Admin)",
)
def get_task_by_id(
    task_id: int,
    database: Session = Depends(db.get_db),
    _: User = Depends(require_admin_user),
) -> task_schema.TaskBase:
    return admin_services.get_task_by_id(task_id, database)


@router.delete(
    "/tasks/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,
    summary="Delete task by ID (Admin)",
)
def delete_task_by_id(
    task_id: int,
    database: Session = Depends(db.get_db),
    _: User = Depends(require_admin_user),
) -> Response:
    admin_services.delete_task_by_id(task_id, database)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.patch(
    "/tasks/{task_id}",
    status_code=status.HTTP_200_OK,
    response_model=task_schema.TaskBase,
    summary="Update task by ID (Admin)",
)
def update_task_by_id(
    request: task_schema.TaskUpdate,
    task_id: int,
    database: Session = Depends(db.get_db),
    _: User = Depends(require_admin_user),
) -> task_schema.TaskBase:
    return admin_services.update_task_by_id(request, task_id, database)