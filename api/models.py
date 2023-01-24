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
    profile_url: Optional[str]
    bio: Optional[str]


class Account(AccountIn):
    id: PydanticObjectId


class AccountOut(BaseModel):
    id: str
    username: str
    password: str


class AccountDetailOut(BaseModel):
    id: str
    username: str
    password: str
    profile_url: str
    bio: str


class AccountRepo(BaseModel):
    games: List[AccountOut]


class GameIn(BaseModel):
    name: str
    cover_url: str


class GameOut(BaseModel):
    id: str
    name: str
    cover: str

class SearchGameOut(BaseModel):
    id: str
    name: str
    cover: str
    number_of_games: Optional[int]

class SearchGameList(BaseModel):
    games: List[SearchGameOut]


class GameDetailOut(BaseModel):
    id: str
    name: str
    alternative_names: list
    cover: str
    category: str
    collection_id: list
    dlcs_id: list
    franchises_id: list
    first_release_date: str
    game_modes_id: list
    genres_id: list
    game_engines_id: list
    involved_companies_id: list
    keywords_id: dict
    platforms_id: list
    player_perspectives_id: list
    ports_id: list
    remakes_id: list
    remasters_id: list
    similar_games_id: list
    summary: str
    storyline: str
    status: str
    screenshots: list
    themes_id: list
    total_rating: int
    total_rating_count: int
    version_parent_id: str
    version_title: str


class GameSearchOut(BaseModel):
    game: GameOut


class GameList(BaseModel):
    games: List[GameOut]


class MyGameListIn(BaseModel):
    account_id: str
    name: str
    description: str
    games: Optional[list]


class MyGameList(MyGameListIn):
    id: PydanticObjectId


class MyGameListOut(MyGameListIn):
    id: str
    account_id: str
    name: str
    description: str
    games: list


class MyGameListRepo(BaseModel):
    mgls: List[MyGameListOut]


class MyGameListDetailIn(BaseModel):
    name: str
    description: str


class MyGameListUpdateIn(BaseModel):
    name: Optional[str]
    description: Optional[str]
    games: list
