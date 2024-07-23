# app/routes/endpoints/auth.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from app.database import get_db
from app.models.user import User
from app.models.user_token import UserToken
from app.schemas.auth import UserCreate, UserLogin
from app.utils.response import create_response
from app.utils.token import create_access_token
from app.utils.security import hash_password, verify_password

auth_routes = APIRouter()

@auth_routes.post("/signup")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        # Start a transaction
        db.begin()
        
        db_user = db.query(User).filter(User.email == user.email).first()
        if db_user:
            return create_response(status=False, message="Email already registered")
        
        hashed_password = hash_password(user.password)
        new_user = User(
            name=user.name,
            email=user.email,
            password=hashed_password,  
        )
        
        db.add(new_user)
        db.commit()  # Commit user creation
        db.refresh(new_user)

        access_token = create_access_token(
            data={"sub": new_user.id}
        )
        
        # Store the token in the user_tokens table
        user_token = UserToken(
            user_id=new_user.id,
            token=access_token
        )
        db.add(user_token)
        db.commit()  # Commit token creation
        
        return create_response(
            status=True, 
            message="User created successfully", 
            entity={
                "user_id": new_user.id,
                "user_name": new_user.name,
                "user_email": new_user.email,
                "x_Access": access_token
            }
        )
    
    except SQLAlchemyError as e:
        db.rollback()  # Rollback transaction in case of error
        return create_response(status=False, message="Internal server error", entity={"error": str(e)})


@auth_routes.post("/login")
def user_login(user: UserLogin, db: Session = Depends(get_db)):
    try:
        # Start a transaction
        db.begin()
        
        db_user = db.query(User).filter(User.email == user.email).first()
        if db_user is None:
            return create_response(status=False, message="User not found")
        
        if not verify_password(user.password, db_user.password):  # Validate password
            return create_response(status=False, message="Incorrect password")
        
        # Delete existing tokens for the user
        db.query(UserToken).filter(UserToken.user_id == db_user.id).delete()
        
        access_token = create_access_token(
            data={"sub": db_user.id}
        )
        
        # Store the new token in the user_tokens table
        user_token = UserToken(
            user_id=db_user.id,
            token=access_token
        )
        db.add(user_token)
        db.commit()  # Commit token creation

        return create_response(
            status=True, 
            message="Login successful", 
            entity={
                "user_id": db_user.id,
                "user_name": db_user.name,
                "user_email": db_user.email,
                "x_Access": access_token
            }
        )
    
    except SQLAlchemyError as e:
        db.rollback()  # Rollback transaction in case of error
        return create_response(status=False, message="Internal server error", entity={"error": str(e)})
