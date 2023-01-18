from fastapi import APIRouter, Depends
from models import (
    MyGameListOut,
    MyGameListIn,
    AccountOut,
    MyGameListRepo,
    GameList,
    MyGameListDetailIn,
    MyGameListUpdateIn
)
from queries.mgls import MGLQueries
from queries.games import GameQueries
from .authenticator import authenticator


router = APIRouter()


@router.post("/mgls/", response_model=MyGameListOut)
async def create_mgl(
    mgl: MyGameListDetailIn,
    repo: MGLQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account = AccountOut(**account_data)
    user_mgl = MyGameListIn(
        account_id=account.id, name=mgl.name, description=mgl.description
    )
    user_mgl = repo.create(user_mgl)
    return user_mgl


# get all mgls for logged in user
@router.get("/mgls/", response_model=MyGameListRepo)
async def get_all_my_mgls(
    repo: MGLQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account = AccountOut(**account_data)
    account_id = account.id
    return MyGameListRepo(mgls=repo.get_all(account_id))


# get one mgl
@router.get("/mgls/{mgl_id}/", response_model=MyGameListOut)
async def get_one_mgl(
    mgl_id: str,
    repo: MGLQueries = Depends(),
):
    mgl = repo.get_one(mgl_id)
    return mgl


# delete one mgl
@router.delete("/mgls/{mgl_id}", response_model=bool)
async def delete_mgl(
    mgl_id: str,
    repo: MGLQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    repo.delete_mgl(mgl_id)
    return True

# update name or description of mgl
# @router.put("/mgls/{mgl_id}", response_model=MyGameListOut)
# async def update_mgl(
#     mgl_id: str,
#     mgl: MyGameListUpdateIn,
#     repo: MGLQueries = Depends(),
#     account_data: dict = Depends(authenticator.get_current_account_data),
# ):
#     account = AccountOut(**account_data)
#     account_id = account.id
#     updated_mgl = MyGameListUpdateIn(
#         name=mgl.name, description=mgl.description, account_id=account_id
#     )
#     updated_mgl = repo.update_mgl(mgl=updated_mgl, mgl_id=mgl_id)
#     return updated_mgl



# add game to list
@router.post("/mgls/{mgl_id}/add/{game_name}/", response_model=MyGameListOut)
async def add_game_to_mgl(
    mgl_id: str,
    game_id: int,
    mgl: MyGameListUpdateIn,
    list_repo: MGLQueries = Depends(),
    game_repo: GameQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    mgl = list_repo.add_game(mgl_id=mgl_id, game=game_repo.get_game(game_name))
    return mgl

# remove game from list
@router.put("/mgls/{mgl_id}/remove/{game_id}/", response_model=MyGameListOut)
async def remove_game_from_mgl(
    mgl_id: str,
    game_id: int,
    mgl: MyGameListUpdateIn,
    list_repo: MGLQueries = Depends(),
    game_repo: GameQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account = AccountOut(**account_data)
    account_id = account.id
    updated_mgl = MyGameListUpdateIn(
        name=mgl.name,
        description=mgl.description,
        account_id=account_id,
        games=mgl.games
    )
    updated_mgl = list_repo.remove_game(mgl=updated_mgl, mgl_id=mgl_id)
