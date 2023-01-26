from fastapi.testclient import TestClient
from queries.accounts import AccountQueries

from main import app

client = TestClient(app)


class AccountQueriesMock:
    def get_all(self):
        return []


def test_get_accounts():
    app.dependency_overrides[AccountQueries] = AccountQueriesMock

    response = client.get("/api/accounts/")

    assert response.status_code == 200
    assert response.json() == []

    app.dependency_overrides = {}
