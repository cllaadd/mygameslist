import { useState, useEffect } from "react";
import { NavLink, useParams, Link } from "react-router-dom";
import { useToken } from "../Auth";
import "../styling/mgl.css";

function MGL() {
  const [games, setGames] = useState([]);
  const [mgl, setMGL] = useState([]);
  const { id } = useParams();
  const [token] = useToken();

  const getData = async () => {
    const response = await fetch(`http://localhost:8000/api/mgls/${id}/`);
    const data = await response.json();
    setMGL(data);
    setGames(data.games);
  };

  const handleRemove = async (mgl_id, game_id) => {
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
    const response = await fetch(
      `http://localhost:8000/api/mgls/${mgl_id}/remove/${game_id}`,
      fetchConfig
    );
    const data = await response.json();
    getData();
  };

  useEffect(() => {
    getData();
  }, [id, token]);

  return (
    <div className="container">
      <div>
        <div className="heading">
          <h1>{mgl.name}</h1>
        </div>
        <h2>{mgl.description}</h2>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => {
            return (
              <tr key={game.id}>
                <td>
                  <Link className="link" to={`/games/${game.id}`}>
                    {game.name}
                  </Link>
                </td>
                <td></td>
                <td>
                  <button
                    className="btn btn-warning m-2"
                    onClick={() => {
                      handleRemove(id, game.id);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <NavLink
        className="btn btn-info"
        id="add-game-link"
        aria-current="page"
        to="/games"
      >
        Add games
      </NavLink>
    </div>
  );
}

export default MGL;
