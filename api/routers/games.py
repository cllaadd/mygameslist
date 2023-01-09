from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request
)
from pydantic import BaseModel
from models import GameIn, GameOut, GameList
from queries.games import (
    GameQueries
)
from search_game_name import search_game

router = APIRouter()


@router.post("/games/", response_model=GameOut)
async def create_game(
    game: GameIn,
    repo: GameQueries = Depends(),
):
    return repo.create(game)


@router.get("/games/", response_model=GameList)
async def get_all_games(repo: GameQueries = Depends()):
    return GameList(games=repo.get_all())

@router.get(f"/games/search/")
async def search_games(name: str, repo: GameQueries = Depends()):
    game = repo.find_one({"name": name})
    if game:
        return {"game": GameOut.parse_obj(game)}
    else:
        raise HTTPException(status_code=404, detail="Game not found")
