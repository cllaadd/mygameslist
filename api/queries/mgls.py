from bson.objectid import ObjectId
from typing import List
from .client import Queries
from pymongo import ReturnDocument
from models import MGLIn, MGLOut


class MGLQueries(Queries):
    DB_NAME = "mygamelist"
    MGL = "MGLs"

    def create(self, MGL: MGLIn) -> MGLOut:
        MGL_dict = MGL.dict()
        MGL_dict["user_id"] = ObjectId(MGL_dict["user_id"])
        MGL_dict["games"] = []
        self.MGL.insert_one(MGL_dict)
        MGL_dict["id"] = str(MGL_dict["_id"])
        MGL_dict["user_id"] = str(MGL_dict["user_id"])
        return MGLOut(**MGL_dict)

    def get_all(self, user_id: str) -> List[MGLOut]:
        MGLs = []
        database = self.MGL.find()
        for doc in database:
            doc["id"] = str(doc["_id"])
            doc["user_id"] = str(doc["user_id"])
            if doc["user_id"] == user_id:
                MGLs.append(MGLOut(**doc))
        return MGLs

    def get_one(self, MGL_id: str) -> MGLOut:
        MGL = self.MGL.find_one({"_id": ObjectId(f"{MGL_id}")})
        MGL["user_id"] = str(MGL["user_id"])
        MGL["id"] = str(MGL["_id"])
        return MGL

    def delete_MGL(self, MGL_id: str) -> bool:
        self.MGL.delete_one({"_id": ObjectId(f"{MGL_id}")})

    def update_MGL(self, MGL_id: str, MGL: MGLIn) -> MGLOut:
        MGL_dict = MGL.dict()
        self.MGL.find_one_and_update(
            {"_id": ObjectId(MGL_id)},
            {"$set": MGL_dict},
            return_document=ReturnDocument.AFTER,
        )

        return MGLOut(**MGL_dict, id=MGL_id)

    def add_game_to_MGL(self, game: dict, MGL_id: str) -> MGLOut:
        MGL = self.MGL.find_one({"_id": ObjectId(MGL_id)})
        game_list = MGL.get("games")

        MGL["games"] = game_list

        self.MGL.find_one_and_update(
            {"_id": ObjectId(MGL_id)},
            {"$set": MGL},
            return_document=ReturnDocument.AFTER,
        )

        MGL["user_id"] = str(MGL["user_id"])
        MGL["id"] = str(MGL["_id"])
        return MGLOut(**MGL)


    # remove one game of specified game_id from MGL
    # def remove_game_from_MGL(
    #     self, game_id: int, MGL_id: str
    # ) -> MGLOut:
    #     MGL = self.MGL.find_one({"_id": ObjectId(MGL_id)})
    #     game_list = MGL.get("games")


    #     MGL["games"] = game_list

    #     self.MGL.find_one_and_update(
    #         {"_id": ObjectId(MGL_id)},
    #         {"$set": MGL},
    #         return_document=ReturnDocument.AFTER,
    #     )

    #     MGL["user_id"] = str(MGL["user_id"])
    #     MGL["id"] = str(MGL["_id"])
    #     return MGLOut(**MGL)


    # def remove_all_games_from_MGL(
    #     self, MGL_id: int
    # ) -> MGLOut:
    #     MGL = self.MGL.find_one({"_id": ObjectId(MGL_id)})
    #     game_list = MGL.get("games")

    #     for game_item in game_list:
    #         if game_item.get("MGL_id") == MGL_id:
    #             game_list.remove(game_item)

    #     MGL["games"] = game_list

    #     self.MGL.find_one_and_update(
    #         {"_id": ObjectId(MGL_id)},
    #         {"$set": MGL},
    #         return_document=ReturnDocument.AFTER,
    #     )

    #     MGL["user_id"] = str(MGL["user_id"])
    #     MGL["id"] = str(MGL["_id"])
    #     return MGLOut(**MGL)
