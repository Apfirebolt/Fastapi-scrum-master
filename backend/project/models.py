from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, ForeignKey, Text, DateTime, Integer


from backend.db import Base


class Project(Base):
    __tablename__ = "project"

    id = Column(Integer, primary_key=True, autoincrement=True)
    createdDate = Column(DateTime, default=datetime.now)
    title = Column(String(50))
    description = Column(Text)
    owner_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))

    owner = relationship("User", back_populates="projects")


