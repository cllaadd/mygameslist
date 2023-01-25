import "../styling/Account.css";

import { useEffect, useState } from "react";

function UserComponent() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const getUserData = async () => {
    const response = await fetch("http://localhost:8000/api/accounts/");
    const userData = await response.json();
    setUsers(userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  // const getCurrentUserData = async () => {
  //   const response = await fetch("http://localhost:8000/api/myaccount");
  //   const currentUserData = await response.json();
  //   setCurrentUser(currentUserData);
  // };

  // useEffect(() => {
  //   getCurrentUserData();
  // }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card profile-card">
        <div className="image-container d-flex justify-content-center align-items-center">
          <img
            src="https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg"
            className="img-fluid profile-image"
            alt="Profile"
          />
        </div>
        <div className="card-body">
          {users.map((username) => {
            return (
              <h2 className="card-title text-center">{username.username}</h2>
            );
          })}
          <div className="card-subtitle text-center">
            {users.map((username) => {
              return (
                <button className="btn btn-primary btn-sm view list">
                  {username.username}'s lists
                </button>
              );
            })}
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="card-text">
              <div className="lists">
                <h4 className="lists-title">Lists</h4>
                <span className="lists-count">count</span>
              </div>
            </div>
            <div className="card-text">
              <div className="games">
                <h4 className="games-title">Games</h4>
                <span className="games-count">count</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserComponent;
