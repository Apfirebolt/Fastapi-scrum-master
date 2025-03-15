from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Float, String, ForeignKey, Text, DateTime, Integer


from backend.db import Base


class Task(Base):
    __tablename__ = "task"

    id = Column(Integer, primary_key=True, autoincrement=True)
    createdDate = Column(DateTime, default=datetime.now)
    dueDate = Column(DateTime, default=datetime.now)
    title = Column(String(50))
    description = Column(Text)
    status = Column(String(50))
    owner_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))
    project_id = Column(Integer, ForeignKey("project.id", ondelete="CASCADE"))
    task_logs = relationship("TaskLog", back_populates="task")

    owner = relationship("User", back_populates="tasks")
    project = relationship("Project", back_populates="tasks")


class TaskLog(Base):
    __tablename__ = "task_log"

    id = Column(Integer, primary_key=True, autoincrement=True)
    createdDate = Column(DateTime, default=datetime.now)
    task_id = Column(Integer, ForeignKey("task.id", ondelete="CASCADE"))

    task = relationship("Task", back_populates="task_logs")


