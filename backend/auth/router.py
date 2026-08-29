from typing import List, Dict, Any
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from backend.db import get_db
from . import schema, services
from .jwt import create_access_token, get_current_user
from .models import User

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=schema.UserResponse,
    summary="Register a new user"
)
def create_user_registration(
    request: schema.UserRegister,
    database: Session = Depends(get_db)
) -> schema.UserResponse:
    return services.new_user_register(request, database)


@router.post(
    "/login",
    status_code=status.HTTP_200_OK,
    response_model=schema.Token,
    summary="Authenticate user and return JWT"
)
def login(
    request: schema.Login,
    database: Session = Depends(get_db)
) -> schema.Token:
    user = services.authenticate_user(request, database)
    access_token = create_access_token(data={"sub": user.email, "id": user.id})
    return schema.Token(access_token=access_token, token_type="bearer")


@router.get(
    "/profile",
    status_code=status.HTTP_200_OK,
    response_model=schema.UserResponse,
    summary="Get current user profile"
)
def get_profile(
    current_user: User = Depends(get_current_user)
) -> schema.UserResponse:
    return current_user


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=List[schema.UserResponse],
    summary="List all users (Admin/Internal)"
)
def get_all_users(
    database: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> List[schema.UserResponse]:
    return services.all_users(database)


@router.get(
    "/sql",
    status_code=status.HTTP_200_OK,
    summary="Raw SQL user list check"
)
def get_all_users_sql(
    database: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> List[Dict[str, Any]]:
    return services.all_users_sql(database)