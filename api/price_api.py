import requests
import time
from search_game_name import search_game
import os

api_key = os.environ['isad_api_key']
delay = 2


def get_game_plain(search_game):
    api_key = os.environ['isad_api_key']
    url = f'https://api.isthereanydeal.com/v02/search/search/?key={api_key}&q={search_game}&limit=1'

    response = requests.get(url)

    if response.status_code == 200:
        search_results = response.json()
        game_plain = search_results['data']['results'][0]['plain']
        return(game_plain)
    else:
        print(response.status_code)

def get_game_price(game_plain):
    api_key = os.environ['isad_api_key']
    url = f'https://api.isthereanydeal.com/v01/game/prices/?key={api_key}&plains={game_plain}'

    response = requests.get(url)

    if response.status_code == 200:
        game_prices = response.json()
        lowest_price = game_prices['data'][game_plain]['list'][0]["price_new"]
        lowest_price_website = game_prices['data'][game_plain]['list'][0]["url"]
        isthereanydeal = f'https://isthereanydeal.com/game/{game_plain}/info/'
        price_and_website_data = (search_game, lowest_price, lowest_price_website, isthereanydeal)
        return(price_and_website_data)
    else:
        print(response.status_code)



game_plain = get_game_plain(search_game)
time.sleep(delay)  # Pause for 5 seconds before calling the next function
print(get_game_price(game_plain))
