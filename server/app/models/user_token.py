# app/models/user_token.py
from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class UserToken(Base):
    __tablename__ = 'user_tokens'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    token = Column(String(length=255), nullable=False)
    createdAt = Column(TIMESTAMP, server_default=func.current_timestamp(), nullable=False)
    updatedAt = Column(TIMESTAMP, server_default=func.current_timestamp(), onupdate=func.current_timestamp(), nullable=False)

    user = relationship("User", back_populates="tokens")
