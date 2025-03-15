from fastapi import APIRouter, Depends, status, Response, HTTPException, UploadFile
from sqlalchemy.orm import Session
from typing import List
from backend import db
from . import schema
from . import services
from . import validator

from . jwt import create_access_token, get_current_user

from . import hashing
from . models import User

router = APIRouter(tags=['Auth'], prefix='/auth')


@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_user_registration(request: schema.User,
                                   database: Session = Depends(db.get_db)):

    user = await validator.verify_email_exist(request.email, database)

    if user:
        raise HTTPException(
            status_code=400,
            detail="This user with this email already exists in the system."
        )

    new_user = await services.new_user_register(request, database)
    return new_user


@router.get('/', response_model=List[schema.DisplayAccount])
async def get_all_users(database: Session = Depends(db.get_db)):
    return await services.all_users(database)


@router.post('/login')
def login(request: schema.Login,
          database: Session = Depends(db.get_db)):    
    user = database.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if not hashing.verify_password(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Password")

    # Generate a JWT Token
    access_token = create_access_token(data={"sub": user.email, "id": user.id})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get('/profile', response_model=schema.DisplayAccount)
async def get_profile(database: Session = Depends(db.get_db), current_user: schema.User = Depends(get_current_user)):
    return await services.get_profile(database, current_user)










