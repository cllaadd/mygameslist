from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.users import UserIn, UserOut, Error, UserRepository


router = APIRouter()

@router.post("/users", response_model=Union[UserOut, Error])
def create_vacation(
    user: UserIn,
    response: Response,
    repo: UserRepository() = Depends()
    ):
    response.status_code = 400
    return repo.create(user)
