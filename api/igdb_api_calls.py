import requests
from datetime import datetime, timedelta
from search_game_name import search_game
import os
try:
    from keys import igdb_client_id, igdb_access_key
except:
    igdb_client_id = os.environ['igdb_client_id']
    igdb_access_key = os.environ['igdb_access_key']

def find_game_data():
    fields = (
        'name',
        'game_modes',
        'genres',
        'cover',
        'similar_games',
        'category',
        'collection',
        'involved_companies',
        'platforms',
        'player_perspectives',
        'themes',
        'summary',
        'storyline',
        'first_release_date',
        )

    url = 'https://api.igdb.com/v4/games/'

    header = {
        'Client-ID': igdb_client_id,
        'Authorization': igdb_access_key,
        'TLS': '1.2'
    }


    payload = (
        'fields name,game_modes.name,genres.name,cover.image_id,similar_games.name,category,collection.name,involved_companies.company.name,platforms.name,player_perspectives.name,themes.name,summary,storyline,first_release_date;'
        f'search "{search_game}";'
        'limit 1;'
    )

    response = requests.request("POST", url, headers=header, data=payload)

    category_dict = {
        0: 'main_game',
        1: 'dlc_addon',
        2: 'expansion',
        3: 'bundle',
        4: 'standalone_expansion',
        5: 'mod',
        6: 'episode',
        7: 'season',
        8: 'remake',
        9: 'remaster',
        10: 'expanded_game',
        11: 'port',
        12: 'fork',
        13: 'pack',
        14: 'update'
    }

    if response.status_code == 200:
        games = response.json()

        #response_headers = response.headers
        #print(response_headers)

        total_games_found = 0
        game_number = 0

        for game in games:
            name_list = []
            game_mode_list = []
            genres_list = []
            cover_list = []
            similar_game_list = []
            catagory_list = []
            collection_list = []
            involved_companies_list = []
            platform_list = []
            player_perspective_list = []
            themes_list = []
            summary_list = []
            storyline_list = []
            first_release_date_list = []
            field_errors = {}
            field_error_counter = 0

            print("Game Number " + str((game_number + 1)))
            for field in fields:
                print(field)
                try:
                    if field == 'name':
                        game_name = games[game_number][field]
                        name_list.append(game_name)
                        print(name_list)

                    elif field == 'game_modes':
                        game_modes = games[game_number][field]
                        for game_mode in game_modes:
                            game_mode_list.append(game_mode['name'])
                        print(game_mode_list)

                    elif field == 'genres':
                        genres = games[game_number][field]
                        for genre in genres:
                            genres_list.append(genre['name'])
                        print(genres_list)

                    elif field == 'cover':
                        cover_art_id = games[game_number][field]['image_id']
                        cover_url = ('https://images.igdb.com/igdb/image/upload/t_cover_big/' + cover_art_id + '.jpg')
                        cover_list.append(cover_url)
                        print(cover_list)

                    elif field == 'similar_games' and len(games[game_number][field]) > 0:
                        length_of_field = len(games[game_number][field])
                        if length_of_field <= 5:
                            similar_games = games[game_number][field][0:length_of_field]
                        else:
                            similar_games = games[game_number][field][0:5]
                        for similar_game in similar_games:
                            similar_game_list.append(similar_game['name'])
                        print(similar_game_list)

                    elif field == 'category':
                        category_number = games[game_number][field]
                        catagory_list.append(category_dict[category_number])
                        print(catagory_list)

                    elif field == 'collection':
                        collection = games[game_number][field]
                        collection_list.append(collection['name'])
                        print(collection_list)

                    elif field == 'involved_companies':
                        involved_companies = games[game_number][field]
                        for involved_company in involved_companies:
                            involved_companies_list.append(involved_company['company']['name'])
                        print(involved_companies_list)

                    elif field == 'platforms':
                        platforms = games[game_number][field]
                        for platform in platforms:
                            platform_list.append(platform['name'])
                        print(platform_list)

                    elif field == 'player_perspectives':
                        perspectives = games[game_number][field]
                        for perspective in perspectives:
                            player_perspective_list.append(perspective['name'])
                        print(player_perspective_list)

                    elif field == 'themes':
                        themes = games[game_number][field]
                        for theme in themes:
                            themes_list.append(theme['name'])
                        print(themes_list)

                    elif field == 'summary':
                        summary = games[game_number][field]
                        summary_list.append(summary)
                        print(summary_list)

                    elif field == 'storyline':
                        storyline = games[game_number][field]
                        storyline_list.append(storyline)
                        print(storyline_list)

                    elif field == 'first_release_date':
                        unix_timestamp = games[game_number][field]
                        decoded_date = ((datetime.fromtimestamp(unix_timestamp) - timedelta(hours=2)).strftime('%B %d, %Y'))
                        first_release_date_list.append(decoded_date)
                        print(first_release_date_list)

                except KeyError:
                    field_error_counter += 1
                    field_errors[field_error_counter] = (field + ' is not in the database')
                    print(field + ' is not in the database')

                # else:
                #     try:
                #         print(games[game_number][field])
                #     except KeyError:
                #         print(field + ' is not in the database')
            game_number += 1
            total_games_found += 1
        print('errors')
        print(field_errors)
        print(total_games_found)
    else:
        print(response.status_code)
        print(response.text)
        print("game could not be found")



print(find_game_data())
