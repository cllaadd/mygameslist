from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class UserIn(BaseModel):
    username: str
    password: str


class UserOut(BaseModel):
    username: str
    password: str


class UserRepository:
    def create(self, user: UserIn) -> Union[UserOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (username, password)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user.username,
                            user.password
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = user.dict()
                    return UserOut(id=id, **old_data)
        except Exception:
            return {"message": "Create did not work"}
