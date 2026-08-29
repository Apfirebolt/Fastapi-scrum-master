from typing import List, Optional, Dict, Any
from fastapi import HTTPException, status
from sqlalchemy import text, select
from sqlalchemy.orm import Session

from . import hashing, models, schema, validator


def new_user_register(request: schema.UserRegister, database: Session) -> models.User:
    # Check if user already exists
    if validator.verify_email_exist(request.email, database):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists in the system."
        )

    hashed_pass = hashing.get_password_hash(request.password)
    new_user = models.User(
        username=request.username,
        email=request.email,
        password=hashed_pass,
        firstName=request.firstName,
        lastName=request.lastName,
        role="user"
    )

    database.add(new_user)
    database.commit()
    database.refresh(new_user)
    return new_user


def authenticate_user(login_data: schema.Login, database: Session) -> models.User:
    user = validator.verify_email_exist(login_data.email, database)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="User not found with this email"
        )

    if not user.check_password(login_data.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Invalid credentials"
        )

    return user


def all_users(database: Session) -> List[models.User]:
    stmt = select(models.User).order_by(models.User.id.asc())
    return list(database.scalars(stmt).all())


def all_users_sql(database: Session) -> List[Dict[str, Any]]:
    stmt = text("SELECT id, email FROM public.user ORDER BY id ASC")
    result = database.execute(stmt)
    records = result.fetchall()

    return [{"id": row[0], "email": row[1]} for row in records]


def get_user_by_id(user_id: int, database: Session) -> models.User:
    user = database.get(models.User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with ID {user_id} not found"
        )
    return user