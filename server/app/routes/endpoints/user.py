# app/routes/endpoints/user.py
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.utils.response import create_response
from app.utils.middleware import token_required

user_routes = APIRouter()

@user_routes.get("/all_users")
async def get_all_users(request: Request, db: Session = Depends(get_db), _ = Depends(token_required)):
    try:
        # Query all users
        users = db.query(User).all()
        if not users:
            return create_response(status=False, message="No users found")
        
        # Extract emails and IDs
        user_list = [{"id": user.id, "email": user.email} for user in users]
        
        return create_response(
            status=True, 
            message="Users retrieved successfully", 
            entity={"users": user_list}
        )
    except Exception as e:
        return create_response(status=False, message="Internal server error", entity={"error": str(e)})
