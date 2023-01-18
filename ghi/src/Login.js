import { useEffect, useState } from "react";
import { useToken } from "./utils";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, login] = useToken();

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="shadow-none p-3 mb-5 bg-secondary rounded p-4 mt-4">
          <h2 style={{ color: "white" }}>Login Please</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="username">User Name</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
              />
            </div>
            <button
              className="btn btn-light"
              onClick={() => {
                login(username, password);
              }}
              type="button"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
