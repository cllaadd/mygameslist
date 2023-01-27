from fastapi.testclient import TestClient
from queries.accounts import AccountQueries
from main import app



client = TestClient(app)

class AccountQueriesMock:
    def get_all(self):
        return [
            {"id": "1", "username": "chris", "password": "password"},
            {"id": "2", "username": "richhomiequan", "password": "snuggle"},
        ]

def test_get_all():
    #arrange
    app.dependency_overrides[AccountQueries] = AccountQueriesMock
    #act
    response = client.get("/api/accounts")
    #assert
    assert response.status_code == 200
    assert len(response.json()) > 1

    app.dependency_overrides = {}
