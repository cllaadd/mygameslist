from bson.objectid import ObjectId
from .client import Queries
from models import User, UserIn, UserOut, UserUpdateIn
from pymongo import ReturnDocument
from pymongo.errors import DuplicateKeyError
from typing import Union


class DuplicateUserError(ValueError):
    pass


class UserQueries(Queries):
    DB_NAME = "mygamelist"
    COLLECTION = "users"

    def get(self, email: str) -> User:
        props = self.collection.find_one({"email": email})

        if not props:
            return None
        props["id"] = str(props["_id"])
        return User(**props)

    def get_all(self) -> list[UserOut]:
        db = self.collection.find()
        user_emails = []
        for document in db:
            document["id"] = str(document["_id"])
            user_emails.append(UserOut(**document))
        return user_emails

    def create(
        self, info: UserIn, hashed_password: str
    ) -> User:
        props = info.dict()
        props["password"] = hashed_password
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateUserError()
        props["id"] = str(props["_id"])
        return User(**props)
