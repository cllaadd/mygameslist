from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, games
# from routers.authenticators import authenticator
import os


app = FastAPI()


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
# app.include_router(authenticators.router)
app.include_router(games.router)
