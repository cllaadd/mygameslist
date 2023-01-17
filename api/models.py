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
    cover_url: str


class GameOut(BaseModel):
    id: str
    name: str
    cover_url: str


class GameSearchOut(BaseModel):
    game: GameOut


class GameList(BaseModel):
    games: List[GameOut]


class MyGameListIn(BaseModel):
    account_id: str
    name: str
    description: str


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
