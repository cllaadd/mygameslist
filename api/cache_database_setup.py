import time
import requests
from pymongo import MongoClient
from datetime import datetime, timedelta
from keys import igdb_access_key, igdb_client_id

try:
    conn = MongoClient(username='root',password='password')
    print("Connected successfully!!!")
except:
    print("Could not connect to MongoDB")

db = conn.games

def create_game_mode_db():
    game_mode_db = find_game_mode_data()
    collection = db.game_mode
    for mode in game_mode_db:
        if collection.find_one({"name": mode["name"]}) == None:
            rec_id1 = collection.insert_one({"_id": mode['id'], "name": mode["name"]})
        else:
            pass

def create_genre_db():
    genre_db = find_genre_data()
    collection = db.genre
    for genre in genre_db:
        if collection.find_one({"name": genre["name"]}) == None:
            rec_id1 = collection.insert_one({"_id": genre['id'], "name": genre["name"]})
        else:
            pass

def create_platform_db():
    platform_db = find_platform_data()
    collection = db.platform
    for platform in platform_db:
        if collection.find_one({"name": platform["name"]}) == None:
            rec_id1 = collection.insert_one({"_id": platform['id'], "name": platform["name"]})
        else:
            pass

def create_perspective_db():
    perspective_db = find_perspective_data()
    collection = db.perspective
    for perspective in perspective_db:
        if collection.find_one({"name": perspective["name"]}) == None:
            rec_id1 = collection.insert_one({"_id":perspective['id'], "name":perspective["name"]})
        else:
            pass

def create_themes_db():
    themes_db = find_themes_data()
    collection = db.themes
    for theme in themes_db:
        if collection.find_one({"name": theme["name"]}) == None:
            rec_id1 = collection.insert_one({"_id": theme['id'], "name": theme["name"]})
        else:
            pass

def find_collections_data(collection_offset: int):
    url = 'https://api.igdb.com/v4/collections/'
    header = {
        'Client-ID': igdb_client_id,
        'Authorization': igdb_access_key,
        'TLS': '1.2'
    }
    payload = (
        'fields name,games;'
        'limit 500;'
        f'offset {collection_offset};'
    )
    fields = (
            'id',
            'name',
            'games',
        )
    response = requests.request("POST", url, headers=header, data=payload)
    if response.status_code == 200:
        collections = response.json()
        full_collections_data = {}
        collections_found = 0
        for collection in collections:
            for field in fields:
                if field == 'id':
                    collection_id = collections[collections_found]['id']
                    full_collections_data['_id'] = collection_id
                elif field == 'name':
                    collection_name = collections[collections_found]['name']
                    full_collections_data['name'] = collection_name
                elif field == 'games':
                    try:
                        collection_list = collections[collections_found]['games']
                        full_collections_data['games'] = collection_list
                    except:
                        full_collections_data['games'] = "no games found"
            collections_found += 1
            try:
                collection_data = full_collections_data
                collection = db.collections
                if collection.find_one({'_id': collection_data['_id']}) == None:
                    db_entry = collection.insert_one(collection_data)
                else:
                    print(collections[collections_found]['_id'] + " could not be found")
            except Exception as e:
                pass

        return full_collections_data
    else:
        print(response.status_code)
        print(response.text)
    return collection_data

def find_franchises_data(franchise_offset: int):
    url = 'https://api.igdb.com/v4/franchises/'
    header = {
        'Client-ID': igdb_client_id,
        'Authorization': igdb_access_key,
        'TLS': '1.2'
    }
    payload = (
        'fields name,games;'
        'limit 500;'
        f'offset {franchise_offset};'
    )
    fields = (
            'id',
            'name',
            'games',
        )
    response = requests.request("POST", url, headers=header, data=payload)
    if response.status_code == 200:
        franchises = response.json()
        full_franchises_data = {}
        franchises_found = 0
        for franchise in franchises:
            for field in fields:
                if field == 'id':
                    franchise_id = franchises[franchises_found]['id']
                    full_franchises_data['_id'] = franchise_id
                elif field == 'name':
                    franchise_name = franchises[franchises_found]['name']
                    full_franchises_data['name'] = franchise_name
                elif field == 'games':
                    try:
                        franchise_list = franchises[franchises_found]['games']
                        full_franchises_data['games'] = franchise_list
                    except:
                        full_franchises_data['games'] = "no games found"
            franchises_found += 1
            try:
                franchise_data = full_franchises_data
                collection = db.franchises
                if collection.find_one({'_id': franchise_data['_id']}) == None:
                    db_entry = collection.insert_one(franchise_data)
                else:
                    print(franchises[franchises_found]['_id'] + " could not be found")
            except Exception as e:
                pass

        return full_franchises_data
    else:
        print(response.status_code)
        print(response.text)
    return franchise_data

def find_game_engines_data(engine_offset: int):
    url = 'https://api.igdb.com/v4/game_engines/'
    header = {
        'Client-ID': igdb_client_id,
        'Authorization': igdb_access_key,
        'TLS': '1.2'
    }
    payload = (
        'fields name;'
        'limit 500;'
        f'offset {engine_offset};'
    )
    fields = (
            'id',
            'name',
        )
    response = requests.request("POST", url, headers=header, data=payload)
    if response.status_code == 200:
        game_engines = response.json()
        full_game_engines_data = {}
        game_engines_found = 0
        for game_engine in game_engines:
            for field in fields:
                if field == 'id':
                    game_engines_id = game_engines[game_engines_found]['id']
                    full_game_engines_data['_id'] = game_engines_id
                elif field == 'name':
                    game_engines_name = game_engines[game_engines_found]['name']
                    full_game_engines_data['name'] = game_engines_name
            game_engines_found += 1
            try:
                game_engines_data = full_game_engines_data
                collection = db.game_engines
                if collection.find_one({'_id': game_engines_data['_id']}) == None:
                    db_entry = collection.insert_one(game_engines_data)
                else:
                    print(game_engines[game_engines_found]['_id'] + " could not be found")
            except Exception as e:
                pass

        return full_game_engines_data
    else:
        print(response.status_code)
        print(response.text)
    return game_engines_data

def find_keywords_data(keywords_offset: int):
    url = 'https://api.igdb.com/v4/keywords/'
    header = {
        'Client-ID': igdb_client_id,
        'Authorization': igdb_access_key,
        'TLS': '1.2'
    }
    payload = (
        'fields name;'
        'limit 500;'
        f'offset {keywords_offset};'
    )
    fields = (
            'id',
            'name',
        )
    response = requests.request("POST", url, headers=header, data=payload)
    if response.status_code == 200:
        keywords = response.json()
        full_keywords_data = {}
        keywords_found = 0
        for keyword in keywords:
            for field in fields:
                if field == 'id':
                    keywords_id = keywords[keywords_found]['id']
                    full_keywords_data['_id'] = keywords_id
                elif field == 'name':
                    keywords_name = keywords[keywords_found]['name']
                    full_keywords_data['name'] = keywords_name
            keywords_found += 1
            try:
                keywords_data = full_keywords_data
                collection = db.keywords
                if collection.find_one({'_id': keywords_data['_id']}) == None:
                    db_entry = collection.insert_one(keywords_data)
                else:
                    print(keywords[keywords_found]['_id'] + " could not be found")
            except Exception as e:
                pass

        return full_keywords_data
    else:
        print(response.status_code)
        print(response.text)
    return keywords_data


def find_game_mode_data():
    url = 'https://api.igdb.com/v4/game_modes/'
    header = {
        'Client-ID': igdb_client_id,
        'Authorization': igdb_access_key,
        'TLS': '1.2'
    }
    payload = (
        'fields name;'
        'limit 500;'
    )
    response = requests.request("POST", url, headers=header, data=payload)
    if response.status_code == 200:
        game_modes = response.json()
    else:
        print(response.status_code)
        print(response.text)
    return game_modes

def find_genre_data():
    url = 'https://api.igdb.com/v4/genres/'
    header = {
        'Client-ID': igdb_client_id,
        'Authorization': igdb_access_key,
        'TLS': '1.2'
    }
    payload = (
        'fields name;'
        'limit 500;'
    )
    response = requests.request("POST", url, headers=header, data=payload)
    if response.status_code == 200:
        genres = response.json()
    else:
        print(response.status_code)
        print(response.text)
    return genres

def find_platform_data():
    url = 'https://api.igdb.com/v4/platforms/'
    header = {
        'Client-ID': igdb_client_id,
        'Authorization': igdb_access_key,
        'TLS': '1.2'
    }
    payload = (
        'fields name;'
        'limit 500;'
    )
    response = requests.request("POST", url, headers=header, data=payload)
    if response.status_code == 200:
        platforms = response.json()
    else:
        print(response.status_code)
        print(response.text)
    return platforms

def find_perspective_data():
    url = 'https://api.igdb.com/v4/player_perspectives/'
    header = {
        'Client-ID': igdb_client_id,
        'Authorization': igdb_access_key,
        'TLS': '1.2'
    }
    payload = (
        'fields name;'
        'limit 500;'
    )
    response = requests.request("POST", url, headers=header, data=payload)
    if response.status_code == 200:
        player_perspectives = response.json()
    else:
        print(response.status_code)
        print(response.text)
    return player_perspectives

def find_themes_data():
    url = 'https://api.igdb.com/v4/themes/'
    header = {
        'Client-ID': igdb_client_id,
        'Authorization': igdb_access_key,
        'TLS': '1.2'
    }
    payload = (
        'fields name;'
        'limit 500;'
    )
    response = requests.request("POST", url, headers=header, data=payload)
    if response.status_code == 200:
        themes = response.json()
    else:
        print(response.status_code)
        print(response.text)
    return themes

def find_companies_data(company_offset: int):
    url = 'https://api.igdb.com/v4/companies/'
    header = {
        'Client-ID': igdb_client_id,
        'Authorization': igdb_access_key,
        'TLS': '1.2'
    }
    payload = (
        'fields logo.image_id,*;'
        'limit 500;'
        f'offset {company_offset};'
    )
    response = requests.request("POST", url, headers=header, data=payload)
    company_fields = (
        'id',
        'name',
        'logo',
        'description',
        'published',
        'developed',
        'parent',
    )
    if response.status_code == 200:
        companies = response.json()
        full_company_data = {}
        company_number = 0

        for company in companies:
            for field in company_fields:
                if field == 'id':
                    try:
                        full_company_data['_id'] = companies[company_number][field]
                    except Exception as e:
                        full_company_data['_id'] = f'{field} not found'
                elif field == 'name':
                    try:
                        full_company_data['name'] = companies[company_number][field]
                    except Exception as e:
                        full_company_data['name'] = f'{field} not found'

                elif field == 'logo':
                    try:
                        logo_url = ('https://images.igdb.com/igdb/image/upload/logo_med/'+ companies[company_number][field]['image_id'] + '.jpg')
                        full_company_data['logo'] = logo_url
                    except Exception as e:
                        full_company_data['logo'] = f'{field} not found'

                elif field == 'description':
                    try:
                        full_company_data['description'] = companies[company_number][field]
                    except Exception as e:
                        full_company_data['description'] = f'{field} not found'

                elif field == 'published':
                    try:
                        published_list = companies[company_number][field]
                        full_company_data['published_id'] = published_list
                    except Exception as e:
                        full_company_data['published_id'] = f'{field} not found'

                elif field == 'developed':
                    try:
                        developed_list = companies[company_number][field]
                        full_company_data['developed_id'] = developed_list
                    except Exception as e:
                        full_company_data['developed_id'] = f'{field} not found'

                elif field == 'parent':
                    try:
                        full_company_data['parent'] = companies[company_number][field]
                    except Exception as e:
                        full_company_data['parent'] = f'{field} not found'
            company_number += 1
            try:
                company_db = full_company_data
                collection = db.companies
                if collection.find_one({'_id': company_db['_id']}) == None:
                    collection.insert_one(company_db)
                else:
                    pass
            except KeyError:
                pass



    else:
        print(response.status_code)
        print(response.text)
    return companies


def find_game_data(game_offset: int):
    game_fields = (
        'id',
        'name',
        'alternative_names',
        'cover',
        'category',
        'collection',
        'dlcs',
        'franchises',
        'first_release_date',
        'game_modes',
        'genres',
        'game_engines',
        'involved_companies',
        'keywords',
        'platforms',
        'player_perspectives',
        'ports',
        'remakes',
        'remasters',
        'similar_games',
        'summary',
        'storyline',
        'status',
        'screenshots',
        'themes',
        'total_rating',
        'total_rating_count',
        'version_parent',
        'version_title',
        )

    url = 'https://api.igdb.com/v4/games/'

    header = {
        'Client-ID': igdb_client_id,
        'Authorization': igdb_access_key,
        'TLS': '1.2'
    }

    fields_api = (
        'id',
        'name',
        'alternative_names.name',
        'cover.image_id',
        'category',
        'collection.id',
        'dlcs.id',
        'franchises.id',
        'first_release_date',
        'game_modes.id',
        'genres.id',
        'game_engines.id',
        'involved_companies.company.id',
        'keywords.id',
        'platforms.id',
        'player_perspectives.name',
        'ports.id',
        'remakes.id',
        'remasters.id',
        'similar_games.id',
        'summary',
        'storyline',
        'status',
        'screenshots.image_id',
        'themes.id',
        'total_rating',
        'total_rating_count',
        'version_parent.id',
        'version_title',
    )
    fields_api = ",".join(fields_api)
    payload = (
        f'fields {fields_api};'
        'limit 500;'
        f'offset {game_offset};'

    )

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

    response = requests.request("POST", url, headers=header, data=payload)
    if response.status_code == 200:
        games = response.json()
        full_game_data = {}
        game_number = 0

        for game in games:
            for field in game_fields:
                if field == 'id':
                    try:
                        full_game_data['_id'] = games[game_number][field]
                    except Exception as e:
                        full_game_data[f'_{field}'] = f'{field} not found'

                elif field == 'name':
                    try:
                        full_game_data['name'] = games[game_number][field]
                    except Exception as e:
                        full_game_data[field] = f'{field} not found'

                elif field == 'alternative_names':
                    try:
                        alternative_names_list = []
                        alternative_names = games[game_number][field]
                        for alternative_name in alternative_names:
                            alternative_names_list.append(alternative_name['name'])
                        full_game_data['alternative_names'] = alternative_names_list
                    except Exception as e:
                        full_game_data[field] = f'{field} not found'

                elif field == 'cover':
                    try:
                        cover_url = ('https://images.igdb.com/igdb/image/upload/t_cover_big/'+ games[game_number][field]['image_id'] + '.jpg')
                        full_game_data['cover'] = cover_url
                    except Exception as e:
                        full_game_data[field] = f'{field} not found'

                elif field == 'screenshots':
                    try:
                        screenshots_list = []
                        screenshots = games[game_number][field]
                        for screenshot in screenshots:
                            screenshot = screenshot['image_id']
                            screenshot_url = (f'https://images.igdb.com/igdb/image/upload/t_original/{screenshot}.jpg')
                            screenshots_list.append(screenshot_url)
                        full_game_data[field] = screenshots_list
                    except Exception as e:
                        full_game_data[field] = f'{field} not found'

                elif field == 'category':
                    try:
                        full_game_data['category'] = (category_dict[games[game_number][field]])
                    except Exception as e:
                        full_game_data[field] = f'{field} not found'

                elif field == 'collection':
                    try:
                        full_game_data['collection_id'] = games[game_number][field]['id']
                    except Exception as e:
                        full_game_data[f"{field}_id"] = f'{field} not found'

                elif field == 'dlcs':
                    try:
                        dlcs_list = []
                        dlcs = games[game_number][field]
                        for dlc in dlcs:
                            dlcs_list.append(dlc['id'])
                        full_game_data['dlcs_id'] = dlcs_list
                    except Exception as e:
                        full_game_data[f"{field}_id"] = f'{field} not found'

                elif field == 'franchises':
                    try:
                        franchises_list = []
                        franchises = games[game_number][field]
                        for franchise in franchises:
                            franchises_list.append(franchise['id'])
                        full_game_data['franchises_id'] = franchises_list
                    except Exception as e:
                        full_game_data[f"{field}_id"] = f'{field} not found'

                elif field == 'first_release_date':
                    try:
                        unix_timestamp = games[game_number][field]
                        decoded_date = ((datetime.fromtimestamp(unix_timestamp) - timedelta(hours=2)).strftime('%B %d, %Y'))
                        first_release_date = decoded_date
                        full_game_data['first_release_date'] = first_release_date
                    except Exception as e:
                        full_game_data[field] = f'{field} not found'

                elif field == 'game_modes':
                    try:
                        game_mode_list = []
                        game_mode_list.append(games[game_number][field])
                        full_game_data['game_modes_id'] = game_mode_list
                    except Exception as e:
                        full_game_data[f"{field}_id"] = f'{field} not found'

                elif field == 'genres':
                    try:
                        genres_list = []
                        genres = games[game_number][field]
                        for genre in genres:
                            genres_list.append(genre['id'])
                        full_game_data['genres_id'] = genres_list
                    except Exception as e:
                        full_game_data[f"{field}_id"] = f'{field} not found'

                elif field == 'game_engines':
                    try:
                        game_engines_list = []
                        game_engines = games[game_number][field]
                        for game_engine in game_engines:
                            game_engines_list.append(game_engine['id'])
                        full_game_data['game_engines_id'] = game_engines_list
                    except Exception as e:
                        full_game_data[f"{field}_id"] = f'{field} not found'

                elif field == 'involved_companies':
                    try:
                        involved_companies_list = []
                        involved_companies = games[game_number][field]
                        for involved_company in involved_companies:
                            involved_companies_list.append(involved_company['company']['id'])
                        full_game_data['involved_companies_id'] = involved_companies_list
                    except Exception as e:
                        full_game_data[f"{field}_id"] = f'{field} not found'

                elif field == 'keywords':
                    try:
                        keywords_list = []
                        keywords = games[game_number][field]
                        for keyword in keywords:
                            keywords_list.append(keyword['id'])
                        full_game_data['keywords_id'] = keywords_list
                    except Exception as e:
                        full_game_data[f"{field}_id"] = f'{field} not found'

                elif field == 'platforms':
                    try:
                        platforms_list = []
                        platforms = games[game_number][field]
                        for platform in platforms:
                            platforms_list.append(platform['id'])
                        full_game_data['platforms_id'] = platforms_list
                    except Exception as e:
                        full_game_data[f"{field}_id"] = f'{field} not found'

                elif field == 'player_perspectives':
                    try:
                        player_perspectives_list = []
                        player_perspectives = games[game_number][field]
                        for player_perspective in player_perspectives:
                            player_perspectives_list.append(player_perspective['id'])
                        full_game_data['player_perspectives_id'] = player_perspectives_list
                    except Exception as e:
                        full_game_data[f"{field}_id"] = f'{field} not found'

                elif field == 'ports':
                    try:
                        ports_list = []
                        ports = games[game_number][field]
                        for port in ports:
                            ports_list.append(port['id'])
                        full_game_data['ports_id'] = ports_list
                    except Exception as e:
                        full_game_data[f"{field}_id"] = f'{field} not found'

                elif field == 'remakes':
                    try:
                        remakes_list = []
                        remakes = games[game_number][field]
                        for remake in remakes:
                            remakes_list.append(remake['id'])
                        full_game_data['remakes_id'] = remakes_list
                    except Exception as e:
                        full_game_data[f"{field}_id"] = f'{field} not found'

                elif field == 'remasters':
                    try:
                        remasters_list = []
                        remasters = games[game_number][field]
                        for remaster in remasters:
                            remasters_list.append(remaster['id'])
                        full_game_data['remasters_id'] = remasters_list
                    except Exception as e:
                        full_game_data[f"{field}_id"] = f'{field} not found'

                elif field == 'similar_games':
                    try:
                        if len(games[game_number][field]) > 0:
                            length_of_field = len(games[game_number][field])
                            similar_games_list = []
                            if length_of_field <= 5:
                                similar_games = games[game_number][field][0:length_of_field]
                            else:
                                similar_games = games[game_number][field][0:5]

                            for similar_game in similar_games:
                                similar_games_list.append(similar_game['id'])
                            full_game_data['similar_games_id'] = similar_games_list
                    except Exception as e:
                        full_game_data[f"{field}_id"] = f'{field} not found'


                elif field == 'summary':
                    try:
                        full_game_data['summary'] = games[game_number][field]
                    except Exception as e:
                        full_game_data[field] = f'{field} not found'

                elif field == 'storyline':
                    try:
                        full_game_data['storyline'] = games[game_number][field]
                    except Exception as e:
                        full_game_data[field] = f'{field} not found'

                elif field == 'status':
                    try:
                        full_game_data['status'] = games[game_number][field]
                    except Exception as e:
                        full_game_data[field] = f'{field} not found'

                elif field == 'themes':
                    try:
                        themes_list = []
                        themes = games[game_number][field]
                        for theme in themes:
                            themes_list.append(theme['id'])
                        full_game_data['themes_id'] = themes_list
                    except Exception as e:
                        full_game_data[f"{field}_id"] = f'{field} not found'

                elif field == 'total_rating':
                    try:
                        full_game_data['total_rating'] = games[game_number][field]
                    except Exception as e:
                        full_game_data[field] = f'{field} not found'

                elif field == 'total_rating_count':
                    try:
                        full_game_data['total_rating_count'] = games[game_number][field]
                    except Exception as e:
                        full_game_data[field] = f'{field} not found'

                elif field == 'version_parent':
                    try:
                        full_game_data['version_parent_id'] = games[game_number][field]
                    except Exception as e:
                        full_game_data[f"{field}_id"] = f'{field} not found'

                elif field == 'version_title':
                    try:
                        full_game_data['version_title'] = games[game_number][field]
                    except Exception as e:
                        full_game_data[field] = f'{field} not found'
            game_number += 1
            try:
                game_data = full_game_data
                collection = db.games_db
                if collection.find_one({'_id': game_data['_id']}) == None:
                    db_entry = collection.insert_one(game_data)
                else:
                    print(games[game_number]['_id'] + " could not be found")

            except Exception as e:
                    pass
        return(full_game_data)
    else:
        print(response.status_code)
        print(response.headers)
        print(response.json())


def create_company_db():
    companies_found = 0
    while companies_found < 45000:
        company_offset = companies_found
        find_companies_data(company_offset)
        time.sleep(.25)
        companies_found += 500
        print(f'total companies found {companies_found}')

def create_game_db():
    games_found = 0
    while games_found < 222000:
        game_offset = games_found
        find_game_data(game_offset)
        time.sleep(.25)
        games_found += 500
        print(f'total games found {games_found}')

def create_keyword_db():
    keywords_found = 0
    while keywords_found < 36500:
        keyword_offset = keywords_found
        find_keywords_data(keyword_offset)
        time.sleep(.25)
        keywords_found += 500
        print(f'total keywords found {keywords_found}')

def create_game_engines_db():
    game_engines_found = 0
    while game_engines_found < 1500:
        game_engine_offset = game_engines_found
        find_game_engines_data(game_engine_offset)
        time.sleep(.25)
        game_engines_found += 500
        print(f'total game engines found {game_engines_found}')

def create_franchise_db():
    franchises_found = 0
    while franchises_found < 4000:
        franchise_offset = franchises_found
        find_franchises_data(franchise_offset)
        time.sleep(.25)
        franchises_found += 500
        print(f'total franchises found {franchises_found}')

def create_collections_db():
    collections_found = 0
    while collections_found < 8000:
        collection_offset = collections_found
        find_collections_data(collection_offset)
        time.sleep(.25)
        collections_found += 500
        print(f'total collections found {collections_found}')




delay = .25
create_game_mode_db()
time.sleep(delay)
create_genre_db()
time.sleep(delay)
create_perspective_db()
time.sleep(delay)
create_platform_db()
time.sleep(delay)
create_themes_db()
time.sleep(delay)
create_collections_db()
time.sleep(delay)
create_franchise_db()
time.sleep(delay)
create_game_engines_db()
time.sleep(delay)
create_keyword_db()
time.sleep(delay)
create_company_db()
time.sleep(delay)
create_game_db()
print('Database Caching Complete!!!')
