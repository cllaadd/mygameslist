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
    name: str
    game_modes: List[str]
    genres: List[str]
    cover: List[str]
    similar_games: List[str]
    category: List[str]
    collection: List[str]
    involved_companies: List[str]
    platforms: List[str]
    player_perspectives: List[str]
    themes: List[str]
    summary: List[str]
    storyline: List[str]
    first_release_date: List[str]
    user_id: str
    errors: List[str]



class GameOut(BaseModel):
    name: str
    game_modes: List[str]
    genres: List[str]
    cover: List[str]
    similar_games: List[str]
    category: List[str]
    collection: List[str]
    involved_companies: List[str]
    platforms: List[str]
    player_perspectives: List[str]
    themes: List[str]
    summary: List[str]
    storyline: List[str]
    first_release_date: List[str]
    user_id: str
    errors: List[str]



class GameSearchOut(BaseModel):
    game: GameOut



class GameList(BaseModel):
    games: List[GameOut]
