import "../styling/Account.css";
import { useAuthContext } from "../Auth";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function UserComponent() {
  const [user, setUser] = useState([]);
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    const response = await fetch("http://localhost:8000/api/token/", {
      credentials: "include",
    });
    const userData = await response.json();
    setUser(userData);
  };
  const account = user?.account;
  const username = account?.username;

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (!username) {
    return (
      <div className="container">
        <h2>You must create an account or login</h2>
        <div className="centered">
          <div className="padded">
            <NavLink
              className="btn btn-info"
              id="login-link"
              aria-current="page"
              to="/login"
            >
              Login
            </NavLink>
          </div>
          <div className="padded">
            <NavLink
              className="btn btn-warning"
              id="signup-link"
              aria-current="page"
              to="/signup"
            >
              Sign up
            </NavLink>
          </div>
        </div>
      </div>
    );
  } else {
    navigate(`/users/${username}`);
  }
}

export default UserComponent;
