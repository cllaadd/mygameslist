import { NavLink, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styling/mgl.css";

function User() {
  const [user, setUser] = useState([]);
  const [mgls, setMGLs] = useState([]);
  const { username } = useParams();

  const getUserData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/accounts/${username}`
    );
    const userData = await response.json();
    setUser(userData);
  };

  const getMGLData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/mgls/${username}`);
    const mglData = await response.json();
    setMGLs(mglData.mgls);
  };

  useEffect(() => {
    getUserData();
    getMGLData();
  }, []);

  if (mgls.length > 0) {
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
              <h3 className="lists-title">{user.username}'s lists</h3>
            </div>
            <div className="card-text">
              <div className="list">
                {mgls.map((mgl) => {
                  return (
                    <ul key={mgl.id}>
                      <li className="list-item">
                        <Link className="link" to={`/mgls/${mgl.id}`}>
                          {mgl.name}
                        </Link>
                      </li>
                    </ul>
                  );
                })}
              </div>
            </div>
            <div className="card-text"></div>
          </div>
        </div>
      </div>
    );
  } else {
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
              <h3 className="lists-title">This user has no lists.</h3>
            </div>
          </div>
          <div className="card-text"></div>
        </div>
      </div>
    );
  }
}

export default User;
