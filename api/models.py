from bson.objectid import ObjectId
from pydantic import BaseModel
from typing import List, Optional


class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: ObjectId | str) -> ObjectId:
        if value:
            try:
                ObjectId(value)
            except ValueError:
                raise ValueError(f"Not a valid object id: {value}")
        return value


class UserIn(BaseModel):
    email: str
    password: str
    full_name: str


class UserUpdateIn(BaseModel):
    email: Optional[str]
    password: Optional[str]
    full_name: Optional[str]


class User(UserIn):
    id: PydanticObjectId


class UserOut(BaseModel):
    id: str
    email: str
    full_name: str


class GameIn(BaseModel):
    id: str
    name: str
    game_modes: str
    genres: str
    cover: str
    similar_games: str
    category: str
    collection: str
    involved_companies: str
    platforms: str
    player_perspectives: str
    themes: str
    summary: str
    storyline: str
    first_release_date: str
    user_id: str



class GameOut(BaseModel):
    id: str
    name: str
    game_modes: str
    genres: str
    cover: str
    similar_games: str
    category: str
    collection: str
    involved_companies: str
    platforms: str
    player_perspectives: str
    themes: str
    summary: str
    storyline: str
    first_release_date: str
    user_id: str



class Game(GameIn):
    id: PydanticObjectId


class GameList(BaseModel):
    games: List[GameOut]
