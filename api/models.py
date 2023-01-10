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


class AccountIn(BaseModel):
    username: str
    password: str


class AccountUpdateIn(BaseModel):
    username: Optional[str]
    password: Optional[str]


class Account(AccountIn):
    id: PydanticObjectId


class AccountOut(BaseModel):
    id: str
    username: str
    password: str


class AccountRepo(BaseModel):
    games: List[AccountOut]


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
    account_id: str
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
    account_id: str
    errors: List[str]


class GameSearchOut(BaseModel):
    game: GameOut


class GameList(BaseModel):
    games: List[GameOut]


class MyGameListIn(BaseModel):
    account_id: str
    name: str
    description: str
    game_ids: list


class MyGameList(MyGameListIn):
    id: PydanticObjectId


class MyGameListOut(MyGameListIn):
    id: int
    account_id: str
    name: str
    description: str
    game_ids: list


class MyGameListList(BaseModel):
    MyGameLists: List[MyGameListOut]
