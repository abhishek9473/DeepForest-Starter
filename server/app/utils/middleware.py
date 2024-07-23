# app/utils/middleware.py
from fastapi import Request, HTTPException
from app.database import SessionLocal
from app.models.user_token import UserToken
from app.utils.token import decode_access_token
from app.utils.response import create_response

async def token_required(request: Request):
    try:
        token = request.headers.get("x-access-token")
        user_id = request.headers.get("uid")

        if not token or not user_id:
            raise HTTPException(status_code=401, detail=create_response(status=False, message="Token or user ID missing", entity={}))

        # Validate the token
        try:
            payload = decode_access_token(token)
            if payload and payload["sub"] != int(user_id):
                raise HTTPException(status_code=401, detail="Token mismatch")
        except Exception as e:
            raise HTTPException(status_code=401, detail=create_response(status=False, message=str(e.detail), entity={}))

        # Fetch token from the database
        db = SessionLocal()
        user_token = db.query(UserToken).filter(UserToken.user_id == user_id, UserToken.token == token).first()

        if not user_token:
            raise HTTPException(status_code=401, detail=create_response(status=False, message="Token not found in database", entity={}))

        request.state.valid_id = int(user_id)

    except HTTPException as e:
        # Raise the specific HTTPException with the custom message
        raise HTTPException(status_code=e.status_code, detail=e.detail)

    except Exception as e:
        # Generic exception handling for any unforeseen errors
        raise HTTPException(status_code=401, detail=create_response(status=False, message=f"Unexpected error: {str(e)}", entity={}))

