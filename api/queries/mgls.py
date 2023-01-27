from bson.objectid import ObjectId
from typing import List
from .client import Queries
from models import MyGameListIn, MyGameListOut, GameOut
from pymongo import ReturnDocument, MongoClient
import os


class MGLQueries(Queries):
    DB_NAME = "games"
    COLLECTION = "mgls"

    def create(self, mgl: MyGameListIn) -> MyGameListOut:
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
        single_mgl = []
        pipeline = [
            {"$match": {"_id": ObjectId(mgl_id)}},
            {
                "$lookup": {
                    "from": "games_db",
                    "localField": "games",
                    "foreignField": "_id",
                    "as": "games",
                }
            },
            {
                "$addFields": {
                    "games": {
                        "$map": {
                            "input": "$games",
                            "as": "game",
                            "in": {
                                "name": "$$game.name",
                                "cover": "$$game.cover",
                                "id": "$$game._id",
                            },
                        }
                    },
                }
            },
        ]
        db = self.collection.aggregate(pipeline)
        for document in db:
            document["id"] = str(document["_id"])
            document["account_id"] = str(document["account_id"])
            return MyGameListOut(**document)

    def delete_mgl(self, mgl_id: str) -> bool:
        self.collection.delete_one({"_id": ObjectId(f"{mgl_id}")})

    def add_game(self, mgl_id: str, game_id: int, game: GameOut) -> MyGameListOut:
        try:
            try:
                DATABASE_URL = os.environ["DATABASE_URL"]
                conn = MongoClient(DATABASE_URL)
                print("Connected successfully!!!")
            except:
                print("Could not connect to MongoDB")

            db = conn.games.games_db
            game_to_add = db.find_one({"_id": game_id})
            db = conn.games.mgls
            db.find_one_and_update(
                {"_id": ObjectId(mgl_id)},
                {"$push": {"games": game_to_add["_id"]}},
                return_document=ReturnDocument.AFTER,
            )
            return "Game Added Successfully"
        except Exception as e:
            print(f"{e} there was an error adding the game.")

    def remove_game(self, mgl_id: str, game_id: int):
        # try:
        try:
            DATABASE_URL = os.environ["DATABASE_URL"]
            conn = MongoClient(DATABASE_URL)
            print("Connected successfully!!!")
        except:
            print("Could not connect to MongoDB")

        db = conn.games.games_db
        game_to_remove = db.find_one({"_id": game_id})
        db = conn.games.mgls
        db.find_one_and_update(
            {"_id": ObjectId(mgl_id)},
            {"$pull": {"games": game_to_remove["_id"]}},
            return_document=ReturnDocument.AFTER,
        )
        return "Game Removed Successfully"
