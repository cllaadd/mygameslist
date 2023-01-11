from fastapi import APIRouter, Depends
from models import (
    MyGameListOut,
    MyGameListIn,
    AccountOut,
    MyGameListRepo,
    MyGameListDetailIn
)
from queries.mgls import MGLQueries
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


# Get All My mgls
@router.get("/mgls/", response_model=MyGameListRepo)
async def get_all_my_mgls(
    repo: MGLQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account = AccountOut(**account_data)
    account_id = account.id
    return MyGameListRepo(mgls=repo.get_all(account_id))


# Get One mgl
@router.get("/mgls/{mgl_id}/", response_model=MyGameListOut)
async def get_one_mgl(
    mgl_id: str,
    repo: MGLQueries = Depends(),
):
    mgl = repo.get_one(mgl_id)
    return mgl
