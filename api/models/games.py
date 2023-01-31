from pydantic import BaseModel
from typing import List, Optional


class GameIn(BaseModel):
    name: str
    cover_url: str


class GameOut(BaseModel):
    id: str
    name: str
    cover: str


class SearchGameOut(BaseModel):
    id: str
    name: str
    cover: str
    number_of_games: Optional[int]


class SearchGameList(BaseModel):
    games: List[SearchGameOut]


class GameDetailOut(BaseModel):
    id: str
    name: str
    alternative_names: list
    cover: str
    category: str
    collection_id: list
    dlcs_id: list
    franchises_id: list
    first_release_date: str
    game_modes_id: list
    genres_id: list
    game_engines_id: list
    involved_companies_id: list
    keywords_id: list
    platforms_id: list
    player_perspectives_id: list
    ports_id: list
    remakes_id: list
    remasters_id: list
    similar_games_id: list
    summary: str
    storyline: str
    status: str
    screenshots: list
    themes_id: list
    total_rating: int
    total_rating_count: int
    version_parent_id: str
    version_title: str


class GameSearchOut(BaseModel):
    game: GameOut


class GameList(BaseModel):
    games: List[GameOut]
