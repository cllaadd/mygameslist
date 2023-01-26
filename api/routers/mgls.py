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


router = APIRouter(tags=["mgls"])


@router.post("/api/mgls/", response_model=MyGameListOut)
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



@router.get("/api/mgls/", response_model=MyGameListRepo)
async def get_all_my_mgls(
    repo: MGLQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account = AccountOut(**account_data)
    account_id = account.id
    return MyGameListRepo(mgls=repo.get_all(account_id))



@router.get("/api/mgls/{mgl_id}/", response_model=MyGameListOut)
async def get_one_mgl(
    mgl_id: str,
    repo: MGLQueries = Depends(),
):
    mgl = repo.get_one(mgl_id)
    return mgl


@router.delete("/api/mgls/{mgl_id}", response_model=bool)
async def delete_mgl(
    mgl_id: str,
    repo: MGLQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    repo.delete_mgl(mgl_id)
    return True



@router.put("/api/mgls/{mgl_id}/add/{game_id}/")
async def add_game_to_mgl(
    mgl_id: str,
    game_id: int,
    mgl: MyGameListUpdateIn,
    list_repo: MGLQueries = Depends(),
    game_repo: GameQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    mgl = list_repo.add_game(mgl_id=mgl_id, game=game_repo.get_game(game_id), game_id=game_id)
    return mgl

@router.put("/api/mgls/{mgl_id}/remove/{game_id}/")
async def remove_game_from_mgl(
    mgl_id: str,
    game_id: int,
    mgl: MyGameListUpdateIn,
    list_repo: MGLQueries = Depends(),
    # game_repo: GameQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    mgl = list_repo.remove_game(mgl_id=mgl_id, game_id=game_id)
    return mgl
