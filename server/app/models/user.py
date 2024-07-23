# app/models/user.py
from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.sql import func
from app.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(length=100), nullable=False)
    email = Column(String(length=255), unique=True, nullable=False)
    password = Column(String(length=255), nullable=False)
    createdAt = Column(TIMESTAMP, server_default=func.current_timestamp(), nullable=False)
    updatedAt = Column(TIMESTAMP, server_default=func.current_timestamp(), onupdate=func.current_timestamp(), nullable=False)

    tokens = relationship("UserToken", back_populates="user")
