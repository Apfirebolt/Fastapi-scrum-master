from datetime import datetime, timedelta, timezone
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from backend.db import get_db
from . import models, schema

# Configuration
SECRET_KEY = "20a9bfa73de3f29b6b7a01d4fc84bb569f1b7e8ac7f83c77c62a603f2bf9f5ff"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 Hours

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta if expires_delta else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str, credentials_exception: HTTPException) -> schema.TokenData:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: Optional[str] = payload.get("sub")
        user_id: Optional[int] = payload.get("id")
        
        if email is None:
            raise credentials_exception
            
        return schema.TokenData(email=email, id=user_id)
    except JWTError:
        raise credentials_exception


def get_current_user(
    token: str = Depends(oauth2_scheme), 
    database: Session = Depends(get_db)
) -> models.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    token_data = verify_token(token, credentials_exception)
    
    user = database.query(models.User).filter(models.User.email == token_data.email).first()
    if user is None:
        raise credentials_exception
        
    return user