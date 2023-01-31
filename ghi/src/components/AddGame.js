import React, { useState, useEffect } from "react";
import { useToken } from "../Auth";
import { NavLink, useNavigate } from "react-router-dom";
import "../styling/forms.css";

function AddGameForm({ game_id, game_name, game_cover }) {
  const noData = {
    mgl_id: "",
  };
  const [mglData, setMGLData] = useState(noData);
  const [mgls, setMGLs] = useState([]);
  const [token] = useToken();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const getMGLs = async () => {
    const fetchConfig = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/mgls/`,
      fetchConfig
    );
    if (response.ok) {
      const data = await response.json();
      setMGLs(data.mgls);
    } else {
      alert("Could not find lists");
    }
  };

  const handleChange = (event) => {
    setMGLData({ ...mglData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const mglUrl = `${process.env.REACT_APP_API_HOST}/api/mgls/${mglData.mgl_id}/add/${game_id}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify({
        name: "string",
        description: "string",
        games: ["string"],
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(mglUrl, fetchConfig);
    if (response.ok) {
      const addedGame = await response.json();
      setMGLData(noData);
      setIsOpen(false);
      navigate(`/mgls/${mglData.mgl_id}`);
    } else {
      alert("Could not add game");
    }
  };

  useEffect(() => {
    if (isOpen && token) {
      getMGLs();
    } else if (!isOpen && token) {
      handleSubmit();
    } else {
      console.log("no lists or no acccount");
    }
  }, [isOpen, token, mglData]);

  if (token && mgls.length > 0) {
    return (
      <div className="form">
        <div className="form-content">
          <div className="shadow p-4 mt-4">
            <div className="mgl-add-game-container">
              <h2 className="mgl-add-game-title">
                Which list would you like to add {game_name} to?
              </h2>
              <div className="padded"><img src={game_cover}></img></div>
              <form id="add-game-form">
                <div className="mb-3">
                  <select
                    onChange={handleChange}
                    required
                    id="mgl_id"
                    name="mgl_id"
                    className="form-select"
                  >
                    <option className="mgl-add-game-title" value="">
                      Choose a list
                    </option>
                    {mgls.map((mgl) => {
                      return (
                        <option
                          className="mgl-add-game-title"
                          key={mgl.id}
                          value={mgl.id}
                        >
                          {mgl.name}
                        </option>
                      );
                    })}
                    ;
                  </select>
                </div>
                <button onClick={handleSubmit} className="btn btn-info">
                  Add game
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (token && mgls.length == 0) {
    return (
      <div className="shadow p-4 mt-4">
        <div className="mgl-add-game-container">
          <h1 className="mgl-add-game-title">You don't have any lists yet!</h1>
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
      <div className="shadow p-4 mt-4">
        <div className="mgl-add-game-container">
          <h2 className="mgl-add-game-title">
            You must create an account or login to create a list!
          </h2>
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
      </div>
    );
  }
}
export default AddGameForm;
