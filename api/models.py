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
    username: str


class UserUpdateIn(BaseModel):
    email: Optional[str]
    password: Optional[str]
    username: Optional[str]


class User(UserIn):
    id: PydanticObjectId


class UserOut(BaseModel):
    id: str
    email: str
    username: str


class GameIn(BaseModel):
    id: str
    name: str


class GameOut(BaseModel):
    id: str
    name: str


class Game(GameIn):
    id: PydanticObjectId


class GameList(BaseModel):
    games: List[GameOut]


class MGLDetailsIn(BaseModel):
    name: str
    description: str


class MGLIn(BaseModel):
    user_id: str
    name: str
    description: str


class MGLOut(MGLIn):
    id: str
    user_id: Optional[str]
    name: str
    description: str
    games: list


class MGL(MGLIn):
    id: PydanticObjectId


class MGLList(BaseModel):
    MGLs: List[MGLOut]
