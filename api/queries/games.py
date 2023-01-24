from bson.objectid import ObjectId
from typing import List
from .client import Queries
from models import GameIn, GameOut, GameDetailOut, SearchGameOut
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

    def get_all(self, game_limit: int, game_offset: int) -> List[GameOut]:
        games = []
        db = self.collection.find().limit(game_limit).skip(game_offset)
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

    def get_search(self, query_param: str, param_id: int, game_limit: int, game_offset: int) -> List[SearchGameOut]:
        games = []
        number_of_games = self.collection.count_documents({f'{query_param}' : param_id})
        pipeline = [
            {'$match': {f'{query_param}' : param_id}},
            {'$limit': game_limit},
            {'$skip': game_offset},
        ]
        db = self.collection.aggregate(pipeline)
        for document in db:
            document["id"] = str(document["_id"])
            document["number_of_games"] = number_of_games
            games.append(SearchGameOut(**document))
        return games


    def get_game_detail(self, id: int) -> List[GameDetailOut]:
        single_game = []
        pipeline = [
            {'$match': {'_id' : id}},
            {
            '$lookup':
            {
                'from' : 'genre',
                'localField': 'genres_id',
                'foreignField': '_id',
                'as': 'genres_id'
            }},
            {
            '$lookup':
            {
                'from': 'game_mode',
                'localField': 'game_modes_id',
                'foreignField': '_id',
                'as': 'game_modes_id'
            }},
            {
            '$lookup':
            {
                'from': 'perspective',
                'localField': 'player_perspectives_id',
                'foreignField': '_id',
                'as': 'player_perspectives_id'
            }},
            {
            '$lookup':
            {
                'from': 'platform',
                'localField': 'platforms_id',
                'foreignField': '_id',
                'as': 'platforms_id'
            }},
            {
            '$lookup':
            {
                'from': 'themes',
                'localField': 'themes_id',
                'foreignField': '_id',
                'as': 'themes_id'
            }},
            {
            '$lookup':
            {
                'from' : 'keywords',
                'localField': 'keywords_id',
                'foreignField': '_id',
                'as': 'keywords_id'
            }},
            {
            '$lookup':
            {
                'from' : 'collections',
                'localField': 'collection_id',
                'foreignField':'_id',
                'as': 'collection_id'
            }},
            {
            '$lookup':
            {
                'from' : 'franchises',
                'localField': 'franchises_id',
                'foreignField':'_id',
                'as': 'franchises_id'
            }},
            {
            '$lookup':
            {
                'from' : 'games_db',
                'localField': 'similar_games_id',
                'foreignField':'_id',
                'as': 'similar_games_id'
            }},
            {
            '$lookup':
            {
                'from' : 'companies',
                'localField': 'involved_companies_id',
                'foreignField':'_id',
                'as': 'involved_companies_id'
            }},

            {
            '$addFields': {
                'similar_games_id': {
                    '$map': {
                        'input': '$similar_games_id',
                        'as': 'game',
                        'in': {
                            'name': '$$game.name',
                            'cover': '$$game.cover',
                            'id': '$$game._id',
                        },
                    }
                },
                'involved_companies_id': {
                    '$map': {
                        'input': '$involved_companies_id',
                        'as': 'company',
                        'in': {
                            'name': '$$company.name',
                            'logo': '$$company.logo',
                            'id': '$$company._id',
                        },
                    }
                },
                'franchises_id': {
                    '$map': {
                        'input': '$franchises_id',
                        'as': 'franchise',
                        'in': {
                            'name': '$$franchise.name',
                            'id': '$$franchise._id',
                        },
                    }
                },
                'collection_id': {
                    '$map': {
                        'input': '$collection_id',
                        'as': 'collection',
                        'in': {
                            'name': '$$collection.name',
                            'id': '$$collection._id',
                        },
                    }
                },
                'keywords_id': {
                    '$arrayToObject': {
                        '$map': {
                            'input': '$keywords_id',
                            'as': 'keywords',
                            'in': {
                                'k': {'$convert': {'input': '$$keywords._id', 'to': 'string'}},
                                'v': '$$keywords.name'
                            },
                        }
                    },

                },
                # 'total_rating': {
                #     '$toDouble': {
                #         'input': '$total_rating',
                #         'onError': 0,
                #         'onNull': 0
                #     }
                # },
                # 'total_rating_count': {
                #     '$toDouble': {
                #         'input': '$total_rating_count',
                #         'onError': 0,
                #         'onNull': 0
                #     }
                # }
            }},
            ]
        db = self.collection.aggregate(pipeline)
        # db = self.collection.find({'_id': id})
        for document in db:
            document["id"] = str(document["_id"])
            single_game.append(GameDetailOut(**document))
        return single_game
