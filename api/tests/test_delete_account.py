from fastapi.testclient import TestClient
from queries.accounts import AccountQueries
from main import app


client = TestClient(app)


class AccountQueriesMock:
    def delete(self, account_id):
        return [{"id": "1", "username": "chris", "password": "password"}]


def test_delete_account():
    # arrange
    app.dependency_overrides[AccountQueries] = AccountQueriesMock
    # act
    response = client.delete("/api/accounts/1")
    # assert
    assert response.status_code == 200
    assert response.json() == True

    app.dependency_overrides = {}
