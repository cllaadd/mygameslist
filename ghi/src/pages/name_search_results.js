import { useState, useEffect, } from "react";
import { NavLink, Link, useLocation, useNavigate, useParams} from "react-router-dom";
import imagenotavail from "../images/imagenotavail.jpg";

function SearchResults() {
    const [games, setgames] = useState([])
    const [noimage, setNoImage] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [searchparamname, setSearchParamName] = useState([])
    const [numberofgames, setNumberOfGames] = useState()

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const param_name = params.get("param_name");

    const getGameData = async (search_param_name) => {
        window.scrollTo(0,0)
        const response = await fetch(`http://localhost:8000/games/name/search/?param_name=${search_param_name}`)
        const gameData = await response.json()
        setgames(gameData.games)
        setNumberOfGames(gameData['games'][0].number_of_games)
        setNoImage(imagenotavail)
        setRefresh(false);
    }

    useEffect(() => {
        getGameData(param_name);
    }, [param_name])

    return (
    <div>
        <div>
            <text>Number of Games Found {numberofgames}</text>
        </div>
        {games.map(game => (
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

// function GameSearch() {
//     const [games, setgames] = useState([])
//     const [noimage, setNoImage] = useState([])
//     const [refresh, setRefresh] = useState(false)
//     const [searchparam, setSearchParam] = useState([])
//     const [searchparamname, setSearchParamName] = useState([])
//     const [numberofgames, setNumberOfGames] = useState()

//     const location = useLocation();
//     const params = new URLSearchParams(location.search);
//     const query_param = params.get("query_param");
//     const param_id = params.get("param_id");
//     const search_param = params.get("search_param")
//     const search_param_name = params.get("search_param_name")


//     const getGameData = async () => {
//         window.scrollTo(0,0)
//         const response = await fetch(`http://localhost:8000/games/search/?query_param=${query_param}&param_id=${param_id}`)
//         const gameData = await response.json()

//         setgames(gameData.games)
//         setNumberOfGames(gameData['games'][0].number_of_games)
//         setNoImage(imagenotavail)
//         setRefresh(false);
//         setSearchParam(search_param)
//         setSearchParamName(search_param_name)
//     }




//     useEffect(() => {
//         getGameData();
//     }, []
//     )


//     return (
//         <div>
//             <div></div>
//             <h1>{searchparam}</h1>
//             <h2>{searchparamname}</h2>
//             <h3>{numberofgames} games were found</h3>
//             <table className="search-table">
//                 <thead>
//                     <tr>
//                         <th></th>
//                         <th></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                      {games?.map(game => {
//                         return (
//                             <tr key={game.id}>
//                                 <a href={`/games/${game.id}`} onClick={() => setRefresh(true)}>
//                                     <h3>{game.name}</h3>
//                                 </a>
//                             <td><img src={game.cover === "cover not found" ? noimage : game.cover} className="img-fluid" /></td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     )
// }
