from datetime import datetime, timezone
from typing import TYPE_CHECKING, List, Optional
from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.db import Base

if TYPE_CHECKING:
    from backend.auth.models import User
    from backend.project.models import Project


class Task(Base):
    __tablename__ = "task"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    
    createdDate: Mapped[Optional[datetime]] = mapped_column(
        "createdDate",
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        server_default=func.now(),
        nullable=True,
    )
    dueDate: Mapped[Optional[datetime]] = mapped_column(
        "dueDate",
        DateTime(timezone=True),
        nullable=True,
    )
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="To Do", nullable=False)
    
    owner_id: Mapped[int] = mapped_column(
        Integer, 
        ForeignKey("user.id", ondelete="CASCADE"), 
        nullable=False
    )
    project_id: Mapped[Optional[int]] = mapped_column(
        Integer, 
        ForeignKey("project.id", ondelete="CASCADE"), 
        nullable=True
    )

    # Relationships
    owner: Mapped["User"] = relationship("User", back_populates="tasks")
    project: Mapped[Optional["Project"]] = relationship("Project", back_populates="tasks")
    task_logs: Mapped[List["TaskLog"]] = relationship(
        "TaskLog", 
        back_populates="task", 
        cascade="all, delete-orphan"
    )


class TaskLog(Base):
    __tablename__ = "task_log"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    createdDate: Mapped[Optional[datetime]] = mapped_column(
        "createdDate",
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        server_default=func.now(),
        nullable=True,
    )
    task_id: Mapped[int] = mapped_column(
        Integer, 
        ForeignKey("task.id", ondelete="CASCADE"), 
        nullable=False
    )

    task: Mapped["Task"] = relationship("Task", back_populates="task_logs")