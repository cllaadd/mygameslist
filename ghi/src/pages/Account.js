import { useEffect, useState } from "react";

function UserComponent() {
  const [user, setUser] = useState("");

  const getUserData = async () => {
    const response = await fetch("http://localhost:8000/api/accounts/");
    const userData = await response.json();
    setUsername(userData.username);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card">
        <div className="image">
          <img
            src="https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg"
            className="img-fluid"
          />
        </div>
        <div className="mt-5 text-center">
          <h4 className="mb-0">{user.username}</h4>

          <button className="btn btn-primary btn-sm view list">
            View My Game Lists
          </button>
          <div className="games">
            <h6 className="mb-0">Games</h6>
            <span>50</span>
          </div>
          <button className="btn btn-secondar btn-sm view list">
            Update Account
          </button>
          <button className="btn btn-secondar btn-sm view list">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserComponent;
