from fastapi.testclient import TestClient
from queries.mgls import MGLQueries
from main import app


client = TestClient(app)

class MGLQueriesMock:
    def delete(self, mgl_id):
        return True

def test_delete_mgls():
        #arrange
        app.dependency_overrides[MGLQueries] = MGLQueriesMock
        #act
        response = client.delete("/api/mgls/63d1bbef958094c6b10f1b16")
        #assert
        assert response.status_code == 200
        assert response.json()== True

        app.dependency_overrides = {}
