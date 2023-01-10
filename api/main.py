from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.authenticator import authenticator
from routers import games, accounts
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

app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(games.router)
