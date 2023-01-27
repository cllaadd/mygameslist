from fastapi.testclient import TestClient
from queries.accounts import AccountQueries
from models import AccountOut
from routers.accounts import AccountToken
from routers.authenticator import authenticator
from main import app

client = TestClient(app)


class AccountQueriesMock:
    def get(self, username):
        return {
            "id": "1", "username": username, "password": "password",
        }

def test_get_account():

    app.dependency_overrides[AccountQueries] = AccountQueriesMock

    response = client.get("/api/accounts/garrett")

    assert response.status_code == 200
    assert response.json()== {
       "id": "1", "username": "garrett", "password": "password",
    }

    app.dependency_overrides = {}
