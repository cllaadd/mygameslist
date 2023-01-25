import { useEffect, useState } from "react";

function UserComponent() {
  const [user, setUser] = useState([]);

  const getUserData = async () => {
    // const response = await fetch("http://localhost:8000/api/myaccount/");
    const response = await fetch("http://localhost:8000/api/accounts/");
    const userData = await response.json();
    setUser(userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card">
        <div className="image">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            className="img-fluid"
          />
        </div>
        <div className="mt-5 text-center">
          {user.map((username) => {
            return <h4 className="mb-0">{username.username}</h4>;
          })}
          {user.map((username) => {
            return (
              <button className="btn btn-primary btn-sm view list">
                {username.username}'s lists
              </button>
            );
          })}
          <div className="games">
            <h6 className="mb-0">Games</h6>
            <span>50 (ex)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserComponent;
