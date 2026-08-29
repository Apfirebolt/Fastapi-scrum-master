from typing import TYPE_CHECKING, List, Optional
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.db import Base
from . import hashing

if TYPE_CHECKING:
    from backend.project.models import Project
    from backend.tasks.models import Task


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    role: Mapped[str] = mapped_column(String(50), default="user", nullable=False)
    firstName: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    lastName: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)

    # Relationships
    tasks: Mapped[List["Task"]] = relationship(
        "Task", 
        back_populates="owner", 
        cascade="all, delete-orphan"
    )
    projects: Mapped[List["Project"]] = relationship(
        "Project", 
        back_populates="owner", 
        cascade="all, delete-orphan"
    )

    def check_password(self, plain_password: str) -> bool:
        return hashing.verify_password(plain_password, self.password)