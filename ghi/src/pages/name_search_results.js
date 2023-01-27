import { useState, useEffect } from "react";
import {
  NavLink,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import imagenotavail from "../images/imagenotavail.jpg";

function SearchResults() {
  const [games, setgames] = useState([]);
  const [noimage, setNoImage] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchparamname, setSearchParamName] = useState([]);
  const [numberofgames, setNumberOfGames] = useState();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const param_name = params.get("param_name");

  const getGameData = async (search_param_name) => {
    window.scrollTo(0, 0);
    const response = await fetch(
      `http://localhost:8000/api/games/name/search/?param_name=${search_param_name}`
    );
    const gameData = await response.json();
    setgames(gameData.games);
    setNumberOfGames(gameData["games"][0].number_of_games);
    setNoImage(imagenotavail);
    setRefresh(false);
  };

  useEffect(() => {
    getGameData(param_name);
  }, [param_name]);

  return (
    <div>
      <div>
        <text>Number of Games Found {numberofgames}</text>
      </div>
      {games.map((game) => (
        <div key={game.id}>
          <NavLink to={`/games/${game.id}`}>
            <img src={game.cover || noimage} alt={game.name} />
            <p>{game.name}</p>
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
