from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from .authenticator import authenticator
from pydantic import BaseModel
from queries.accounts import (
    AccountQueries,
    DuplicateAccountError,
)
from models import (
    Account,
    AccountIn,
    AccountUpdateIn,
    AccountOut,
)
from routers.accounts import AccountToken, HttpError

@router.get("/api/myaccount/", response_model=AccountToken | HttpError)
async def get_myaccount(
    request: Request,
    account: Account = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if authenticator.cookie_name in request.cookies:
        token_data = {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
        return AccountToken(**token_data)
