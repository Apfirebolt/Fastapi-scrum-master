from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from backend.db import Base

from .import hashing


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50))
    email = Column(String(255), unique=True)
    role = Column(String(50), nullable=True, default='user')
    firstName = Column(String(50))
    lastName = Column(String(50))
    password = Column(String(255))

    tasks = relationship("Task", back_populates="owner")
    projects = relationship("Project", back_populates="owner")

    def __init__(self, username, email, role, password, firstName, lastName, *args, **kwargs):
        self.username = username
        self.email = email
        self.role = role
        self.firstName = firstName
        self.lastName = lastName
        self.password = hashing.get_password_hash(password)

    def check_password(self, password):
        return hashing.verify_password(self.password, password)
