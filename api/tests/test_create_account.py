from fastapi.testclient import TestClient
from queries.accounts import AccountQueries
from main import app


client = TestClient(app)


class AccountQueriesCreateMock:
    created_account = None

    def create_account(self, account_data):
        self.created_account = account_data
        return True


def test_create_account():
    account_queries_mock = AccountQueriesCreateMock()
    app.dependency_overrides[AccountQueries] = account_queries_mock

    account_data = {
        "id": "1",
        "username": "claudia",
        "password": "password",
    }

    response = client.post("/api/accounts", json=account_data)
    assert response.status_code == 307

    app.dependency_overrides = {}
