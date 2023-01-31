from pydantic import BaseModel
from typing import List, Optional
from models.accounts import PydanticObjectId


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
