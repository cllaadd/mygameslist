from fastapi import APIRouter, Depends
from models import MGLOut, MGLIn, MGLList, UserOut, MGLDetailsIn
from queries.mgls import MGLQueries
from .authenticators import authenticator


router = APIRouter(tags=["mgls"])


@router.post("/mgls/", response_model=MGLOut)
async def create_MGL(
    MGL: MGLDetailsIn,
    repo: MGLQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_user_data),
):

    user = UserOut(**user_data)
    mgl = MGLIn(
        user_id=user.id, name=MGL.name, description=MGL.description
    )
    mgl = repo.create(mgl)
    return mgl


# Get All My Lists
@router.get("/mgls/", response_model=MGLList)
async def get_all_my_mgls(
    repo: MGLQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_user_data),
):
    user = UserOut(**user_data)
    user_id = user.id
    return MGLList(mgls=repo.get_all(user_id))


# Get One MGL
@router.get("/mgls/{MGL_id}", response_model=MGLOut)
async def get_one_mgl(
    MGL_id: str,
    repo: MGLQueries = Depends(),
):
    MGL = repo.get_one(MGL_id)
    print(MGL)
    return MGL


# Delete One MGL
@router.delete("/mgls/{MGL_id}", response_model=bool)
async def delete_mgl(
    MGL_id: str,
    repo: MGLQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_user_data),
):
    repo.delete_MGL(MGL_id)
    return True


# Update MGL
@router.put("/mgls/{MGL_id}", response_model=MGLOut)
async def update_MGL(
    MGL_id: str,
    MGL: MGLIn,
    repo: MGLQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_user_data),
):
    user = UserOut(**user_data)
    user_id = user.id
    updated_MGL = MGLIn(
        name=MGL.name, description=MGL.description, user_id=user_id
    )
    updated_MGL = repo.update_MGL(MGL=updated_MGL, MGL_id=MGL_id)
    return updated_MGL
