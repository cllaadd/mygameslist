from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request
)
# from jwtdown_fastapi.authentication import Token
# from .authenticators import authenticator
from pydantic import BaseModel
from queries.users import (
    UserQueries,
    DuplicateUserError,
)
from models import User, UserIn, UserOut, UserUpdateIn
from queries.client import client


class UserForm(BaseModel):
    username: str
    password: str


# class UserToken(Token):
#     user: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()

# @router.post("")
# def create_user(self,data):
#     db = client[dbname]
#     result = db.users.insert_one(data.dict())
#     if result.inserted_id:
#         result = self.get_user(result.inserted)



# @router.get("/token", response_model=UserToken | None)
# async def get_token(
#     request: Request,
#     user: User = Depends(authenticator.try_get_current_user_data),
# ) -> UserToken | None:
#     if authenticator.cookie_name in request.cookies:
#         token_data = {
#             "access_token": request.cookies[authenticator.cookie_name],
#             "type": "Bearer",
#             "user": user,
#         }
#         return UserToken(**token_data)


# @router.put(
#     "/api/user/{user_id}",
#     response_model=UserToken | HttpError,
# )
# async def update_User(
#     user_id: str,
#     info: UserUpdateIn,
#     request: Request,
#     response: Response,
#     repo: UserQueries = Depends(),
# ):
#     if info.password is not None:
#         hashed_password = authenticator.hash_password(info.password)
#     else:
#         hashed_password = None

#     try:
#         user = repo.update(user_id, info, hashed_password)
#     except DuplicateUserError:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Cannot create a user with those credentials",
#         )

#     form = UserForm(username=info.email, password=info.password)
#     token = await authenticator.login(response, request, form, repo)
#     return UserToken(user=user, **token.dict())


# @router.post("/api/user/", response_model=UserToken | HttpError)
# async def create_User(
#     info: UserIn,
#     request: Request,
#     response: Response,
#     repo: UserQueries = Depends(),
# ):

#     hashed_password = authenticator.hash_password(
#         info.password
#     )
#     try:
#         user = repo.create(info, hashed_password)
#     except DuplicateUserError:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Cannot create a user with those credentials",
#         )

#     form = UserForm(username=info.email, password=info.password)

#     token = await authenticator.login(
#         response, request, form, repo
#         )
#     return UserToken(user=user, **token.dict())


# @router.get("/api/users/", response_model=list[UserOut])
# async def get_users(repo: UserQueries = Depends()):
#     return repo.get_all()


# @router.delete("/api/users/{user_id}", response_model=bool)
# async def delete_user(
#     user_id: str,
#     repo: UserQueries = Depends(),
# ):
#     repo.delete(user_id)
#     return True
