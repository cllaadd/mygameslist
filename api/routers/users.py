from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request
)
from jwtdown_fastapi.authentication import Token
from .authenticators import authenticator
from pydantic import BaseModel
from queries.users import (
    UserQueries,
    DuplicateUserError,
)
from models import User, UserIn, UserOut, UserUpdateIn


class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    user: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    User: User = Depends(authenticator.try_get_current_User_data),
) -> UserToken | None:
    if authenticator.cookie_name in request.cookies:
        token_data = {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "User": User,
        }
        return UserToken(**token_data)


@router.put(
    "/api/User/{User_id}",
    response_model=UserToken | HttpError,
)
async def update_User(
    User_id: str,
    info: UserUpdateIn,
    request: Request,
    response: Response,
    repo: UserQueries = Depends(),
):
    if info.password is not None:
        hashed_password = authenticator.hash_password(info.password)
    else:
        hashed_password = None

    try:
        User = repo.update(User_id, info, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create a user with those credentials",
        )

    form = UserForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return UserToken(User=User, **token.dict())


@router.post("/api/User/", response_model=UserToken | HttpError)
async def create_User(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserQueries = Depends(),
):

    hashed_password = authenticator.hash_password(
        info.password
    )
    try:
        User = repo.create(info, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot Create An User With Those Credentials",
        )

    form = UserForm(username=info.email, password=info.password)

    token = await authenticator.login(
        response, request, form, repo
        )
    return UserToken(User=User, **token.dict())


@router.get("/api/users/", response_model=list[UserOut])
async def get_Users(repo: UserQueries = Depends()):
    return repo.get_all()


@router.delete("/api/users/{user_id}", response_model=bool)
async def delete_User(
    User_id: str,
    repo: UserQueries = Depends(),
):
    repo.delete(user_id)
    return True
