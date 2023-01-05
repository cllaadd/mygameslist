from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request
)
from pydantic import BaseModel
from models import GameIn, GameOut, Game
from queries.games import (
    GameQueries
)

router = APIRouter()


@router.post("/games", response_model=GameOut)
async def create_game(
    game: GameIn,
    repo: GameQueries = Depends(),
):
    return repo.create(game)
