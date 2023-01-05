from fastapi import FastAPI
from routers import users
from fastapi.middleware.cors import CORSMiddleware
from routers import users
import os

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "I got it to work!"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
