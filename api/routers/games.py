from fastapi import APIRouter, Depends, Response, HTTPException, status, Request
from pydantic import BaseModel
from models.games import GameIn, GameOut, GameList, SearchGameList
from datetime import datetime, timedelta
from queries.games import GameQueries
import requests
import os

try:
    from keys import igdb_client_id, igdb_access_key
except:
    igdb_client_id = os.environ["igdb_client_id"]
    igdb_access_key = os.environ["igdb_access_key"]

router = APIRouter(tags=["games"])


@router.post("/api/games/", response_model=GameOut)
async def create_game(
    game: GameIn,
    repo: GameQueries = Depends(),
):
    return repo.create(game)


@router.get("/api/games/", response_model=GameList)
async def get_all_games(
    limit: int = 20,
    offset: int = 0,
    repo: GameQueries = Depends(),
):
    return GameList(games=repo.get_all(limit, offset))


@router.get("/api/games/search/", response_model=SearchGameList)
async def get_search_games(
    query_param: str = "_id",
    param_id: int = 0,
    limit: int = 20,
    offset: int = 0,
    repo: GameQueries = Depends(),
):
    return SearchGameList(games=repo.get_search(query_param, param_id, limit, offset))


@router.get("/api/games/name/search/", response_model=SearchGameList)
async def get_search_games_name(
    param_name: str = "",
    limit: int = 100,
    offset: int = 0,
    repo: GameQueries = Depends(),
):
    return SearchGameList(games=repo.get_name_search(param_name, limit, offset))


@router.get("/api/games/{game_id}/")
async def game_details(game_id: int, repo: GameQueries = Depends()):
    game_detail = repo.get_game_detail(game_id)
    return game_detail
