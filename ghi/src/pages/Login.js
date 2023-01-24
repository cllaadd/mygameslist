import { useEffect, useState } from "react";
import { useToken } from "../Auth";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, login] = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    await login(username, password);
    // navigate("/")
  }

  const handleKeypress = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Login Success</h2>
        </div>
      ) : (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Login</h1>
              <form onSubmit={handleSubmit} id="login-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={handleUsernameChange}
                    onKeyDown={handleKeypress}
                    value={username}
                    placeholder="Enter your username"
                    required
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={handlePasswordChange}
                    onKeyDown={handleKeypress}
                    value={password}
                    placeholder="Enter your password"
                    required
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <button className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginComponent;
