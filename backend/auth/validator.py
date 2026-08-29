from typing import Optional
from sqlalchemy.orm import Session
from . import models


def verify_email_exist(email: str, db_session: Session) -> Optional[models.User]:
    return db_session.query(models.User).filter(models.User.email == email).first()