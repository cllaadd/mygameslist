from bson.objectid import ObjectId
from typing import List
from .client import Queries
from models import GameIn, GameOut, Game


class GameQueries(Queries):
    DB_NAME = "mygamelist"
    COLLECTION = "games"

    def create(
        self, game: GameIn
    ) -> GameOut:
        props = game.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return GameOut(**props)

    def get_all(self) -> List[GameOut]:
        games = []
        db = self.collection.find()
        for document in db:
            document["id"] = str(document["_id"])
            games.append(GameOut(**document))
        return games
