from bson.objectid import ObjectId
from typing import List
from .client import Queries
from models import MyGameListIn, MyGameListOut
from pymongo import ReturnDocument


class MGLQueries(Queries):
    DB_NAME = "mygamelist"
    COLLECTION = "mgls"

    def create(
        self, mgl: MyGameListIn
    ) -> MyGameListOut:
        props = mgl.dict()
        props["account_id"] = ObjectId(props["account_id"])
        props["games"] = []
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        props["account_id"] = str(props["account_id"])
        return MyGameListOut(**props)

    def get_all(self, account_id: str) -> List[MyGameListOut]:
        my_game_lists = []
        db = self.collection.find()
        for document in db:
            document["id"] = str(document["_id"])
            document["account_id"] = str(document["account_id"])
            if document["account_id"] == account_id:
                my_game_lists.append(MyGameListOut(**document))
        return my_game_lists

    def get_one(self, mgl_id: str) -> List[MyGameListOut]:
        mgl = self.collection.find_one({"_id": ObjectId(f"{mgl_id}")})
        mgl["account_id"] = str(mgl["account_id"])
        mgl["id"] = str(mgl["_id"])
        return mgl

    def delete_mgl(self, mgl_id: str) -> bool:
        self.collection.delete_one({"_id": ObjectId(f"{mgl_id}")})

    def update_mgl(self, mgl_id: str, mgl: MyGameListIn) -> MyGameListOut:
        mgl_dict = mgl.dict()
        self.collection.find_one_and_update(
            {"_id": ObjectId(mgl_id)},
            {"$set": mgl_dict},
            return_document=ReturnDocument.AFTER,
        )
        return MyGameListOut(**mgl_dict, id=mgl_id)
