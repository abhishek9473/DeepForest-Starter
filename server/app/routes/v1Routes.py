from fastapi import APIRouter
from app.routes.endpoints import auth,user

api_router = APIRouter()


api_router.include_router(auth.auth_routes, prefix="/auth", tags=["auth"])
api_router.include_router(user.user_routes, prefix="/users", tags=["users"])
