from bson.objectid import ObjectId
from .client import Queries
from models import Account, AccountIn, AccountUpdateIn, AccountOut, AccountDetailOut
from pymongo import ReturnDocument
from pymongo.errors import DuplicateKeyError
from typing import Union


class DuplicateAccountError(ValueError):
    pass


class AccountQueries(Queries):
    DB_NAME = (
        # Specifies which database we're querying or inserting data into
        "games"
    )
    COLLECTION = (
        "accounts"
    )

    def get(self, username: str) -> Account:
        props = self.collection.find_one({"username": username})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return Account(**props)

    def get_all(self) -> list[AccountOut]:
        db = self.collection.find()
        account_usernames = []
        for document in db:
            document["id"] = str(document["_id"])
            account_usernames.append(AccountOut(**document))
        return account_usernames

    def delete(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})

    def update(
        self,
        id: str,
        info: AccountUpdateIn,
        hashed_password: Union[None, str]
    ):
        props = info.dict()
        if hashed_password is not None:
            props["password"] = hashed_password

        try:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$set": props},
                return_document=ReturnDocument.AFTER,
            )
        except DuplicateKeyError:
            raise DuplicateAccountError()

        return AccountDetailOut(**props, id=id)

    def create(
        self, info: AccountIn, hashed_password: str
    ) -> Account:
        props = info.dict()
        props["password"] = hashed_password
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["profile_url"] = ""
        props["bio"] = ""
        props["id"] = str(props["_id"])
        return AccountDetailOut(**props)
