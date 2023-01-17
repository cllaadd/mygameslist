from bson.objectid import ObjectId
from typing import List
from .client import Queries
from models import GameIn, GameOut
from search_game_name import search_game


class GameQueries(Queries):
    DB_NAME = "games"
    COLLECTION = "games_db"

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

    def get_game(self, name: str) -> List[GameOut]:
        single_game = []
        db = self.collection.find({"name": name})
        for document in db:
            document["id"] = str(document["_id"])
            single_game.append(GameOut(**document))
        return single_game
