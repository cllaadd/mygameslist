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
import requests
import json

router = APIRouter()


# @router.post("/games/", response_model=GameOut)
# async def create_game(
#     game: GameIn,
#     repo: GameQueries = Depends(),
# ):
#     return repo.create(game)


@router.get("/games/", response_model=GameList)
async def get_all_games(repo: GameQueries = Depends()):
    return GameList(games=repo.get_all())


@router.get("/games/{search}")
async def search_games(search: str):
    output = {"games": []}
    url = f"https://api.igdb.com/v4/games/search?q={search}"
    response = requests.get(url)
    content = json.loads(response.content)
    error_msg = {"message": "No games were found matching your query."}
    if content.get("code") == "not_found" or content.get("total_games") == 0:
        return error_msg
    if content.get("code") == "bad_request":
        return {
            "message": " ".join(content["warnings"])
            + " "
            + content["details"]
            }

    def collect(games):  # appends games in input list to output["games"]
        for game in games:
            if (
                len(game.get("multiverse_ids")) == 0
                or game.get("layout") == "art_series"
            ):
                continue

            if game.get("layout") in [
                "modal_dfc",
                "transform",
            ]:  # has all fields
                object = {
                    "name": game.get("name"),  # "front name // back name"
                    "multiverse_id": game.get("multiverse_ids")[0],
                    "picture_url": game.get("game_faces")[0]
                    .get("image_uris")
                    .get("normal"),
                    "back_picture_url": game.get("game_faces")[1]
                    .get("image_uris")
                    .get("normal"),
                }
            else:  # if game doesn't have all the fields
                object = {
                    "name": game.get("name"),
                    "multiverse_id": game.get("multiverse_ids")[0],
                    "picture_url": game.get("image_uris").get("normal"),
                }

            output["games"].append(object)

    collect(content["data"])

    while content["has_more"]:  # collect games from rest of paginated results
        url = content["next_page"]
        response = requests.get(url)
        content = json.loads(response.content)
        collect(content["data"])

    return error_msg if len(output["games"]) == 0 else output
