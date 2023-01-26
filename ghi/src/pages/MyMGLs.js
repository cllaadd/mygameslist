import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useToken } from "../Auth";
import { useNavigate } from "react-router-dom";
import "../styling/mgl.css";

function MyMGLs() {
  const [mgls, setMGLs] = useState([]);
  const [token] = useToken();
  const navigate = useNavigate();

  const getData = async () => {
    const fetchConfig = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch("http://localhost:8000/api/mgls/", fetchConfig);
    if (response.ok) {
      const data = await response.json();
      setMGLs(data.mgls);
    } else {
      alert("Could not find lists");
    }
  };

  const goToList = async (mgl_id) => {
    navigate(`${mgl_id}`);
  };

  const handleDelete = async (mgl_id) => {
    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      `http://localhost:8000/api/mgls/${mgl_id}`,
      fetchConfig
    );
    const data = await response.json();
    getData();
  };

  useEffect(() => {
    if (token) {
      getData();
    }
  }, [token]);

  if (token && mgls.length > 0) {
    return (
      <div>
        <h1>My Game Lists</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mgls.map((mgl) => {
              return (
                <tr key={mgl.id}>
                  <td>{mgl.name}</td>
                  <td>{mgl.description}</td>
                  <td>
                    <button
                      className="btn btn-light m-2"
                      onClick={() => {
                        goToList(mgl.id);
                      }}
                    >
                      See list
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning m-2"
                      onClick={() => {
                        handleDelete(mgl.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <NavLink
          className="btn btn-info"
          id="add-mgl-link"
          aria-current="page"
          to="/mgls/new"
        >
          Add new list
        </NavLink>
      </div>
    );
  } else if (token && mgls.length == 0) {
    return (
      <div>
        <h2>You do not have any lists yet</h2>
        <div>
          <NavLink
            className="btn btn-info"
            id="add-mgl-link"
            aria-current="page"
            to="/mgls/new"
          >
            Add new list
          </NavLink>
        </div>
      </div>
    );
  } else if (!token && mgls.length == 0) {
    return (
      <div>
        <h2>You must create an account or login to create a list</h2>
        <div>
          <NavLink
            className="btn btn-info"
            id="add-mgl-link"
            aria-current="page"
            to="/login"
          >
            Login
          </NavLink>
        </div>
        <div>
          <NavLink
            className="btn btn-warning"
            id="add-mgl-link"
            aria-current="page"
            to="/signup"
          >
            Sign up
          </NavLink>
        </div>
      </div>
    );
  }
}

export default MyMGLs;
