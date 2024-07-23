from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.v1Routes import api_router
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Load origins from environment variable
FRONTEND_PORT = os.getenv("ORIGINS")

# Configure CORS origins
origins = [FRONTEND_PORT]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Include API routes
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"Hello": "World"}
