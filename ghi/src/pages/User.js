import { NavLink, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styling/Account.css";



function User() {
  const [user, setUser] = useState([]);
  const [mgls, setMGLs] = useState([]);
  const {username} = useParams()

  const getUserData = async () => {
    const response = await fetch(`http://localhost:8000/api/accounts/${username}`);
    const userData = await response.json();
    setUser(userData);
  };

    const getMGLData = async () => {
    const response = await fetch(`http://localhost:8000/api/mgls/${username}`);
    const mglData = await response.json();
    setMGLs(mglData.mgls);
  };

  useEffect(() => {
    getUserData();
  }, []);


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
              <h2 className="card-title text-center">{user.username}</h2>
          <div className="card-subtitle text-center">
                  <h3>{user.username}'s lists</h3>
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

export default User;
