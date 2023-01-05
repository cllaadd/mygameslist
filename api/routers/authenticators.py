import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from models import UserOut, User
from queries.users import UserQueries


class Auth(Authenticator):
    async def get_user_data(
        self, username: str, users: UserQueries
    ) -> User:
        return users.get(username)

    def get_user_getter(
        self, users: UserQueries = Depends()
    ) -> UserQueries:
        return users

    def get_hashed_password(self, user: User) -> str:
        return user.password

    def get_user_data_for_cookie(self, user: User) -> UserOut:
        return user.email, UserOut(**user.dict())


authenticator = Auth(os.environ["SIGNING_KEY"])
