# APIs

## Game

- **Method**: `POST`, `GET`, `PUT`, `DELETE`,
- **Path**: `/api/games`, `/api/games/{game_id}`, `/games/search/`,

Input:

```json
{
  "name": string,
  "cover_url": string,
}
```

Output:

```json
{
  "id": string,
  "name": string,
  "alternative_names": list,
  "cover": string,
  "category": string,
  "collection_id": list,
  "dlcs_id": list,
  "franchises_id": list,
  "first_release_date": string,
  "game_modes_id": list,
  "genres_id": list,
  "game_engines_id": list,
  "keywords_id": list,
  "platforms_id": list,
  "player_perspectives_id": list,
  "ports_id": list,
  "remakes_id": list,
  "remasters_id": list,
  "similar_games_id": list,
  "summary": string,
  "storyline": string,
  "status": string,
  "screenshots": list,
  "themes_id": list,
  "total_rating": int,
  "total_rating_count": int,
  "version_parent_id": str,
  "version_title": str,
}
```

Creating a new game saves the name and cover URL, and the other fields are added from the database cached from the IGDB API. These games can be added to game lists by a user.

## Games List

- **Method**: `POST`, `GET`, `PUT`, `DELETE`,
- **Path**: `/mgls/`, `mgls/{mgl_id}/`, `mgls/{username}/`, `mgls/{mgl_id}/add/{game_id}`, `mgls/{mgl_id}/remove/{game_id}`,

Input:

```json
{
  "account_id": string,
  "name": string,
  "description": string,
  "games": list,
}
```

Output:

```json
{
  "account_id": string,
  "name": string,
  "description": string,
  "games": list
}
```

Creating a new list saves the account ID, name (of the list), description, and list of games. This adds a new games list to the database which can be viewed by a user and updated or deleted by its creator. Once a list is created, games can be added or removed form the list. Users will also be able to see the lists of other users.

## Accounts

- Method: `POST`, `GET`, `PUT`, `DELETE`,
- Path: `/api/accounts/`, `/api/accounts/{username}`

Input:

```json
{
  "username": string,
  "password": string,

}
```

Output:

```json
{
  "username": string,
  "password": string,

}
```

The Accounts API will create, update, or delete a user account. Users will only be required to enter username and password to create an account. Other user will be able access those user's pages through their username.
