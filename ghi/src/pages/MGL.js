import { useState, useEffect } from "react";
import { NavLink, useParams, Link } from "react-router-dom";
import { useToken } from "../Auth";

function MGL() {
    const [games, setGames] = useState([])
    const [mgl, setMGL] = useState([])
    const [refresh, setRefresh] = useState(false)
    const {id} = useParams()
    const [token] = useToken();


    const getData = async () => {
        const response = await fetch(`http://localhost:8000/api/mgls/${id}/`)
        const data = await response.json()
        setMGL(data)
        setGames(data.games)
        setRefresh(false);
    }

    const handleRemove = async (mgl_id, game_id) => {
        const fetchConfig = {
            method: 'put',
            body: JSON.stringify({
                "name": "string",
                "description": "string",
                "games": [
                    "string"
                ]
                }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const response = await fetch(`http://localhost:8000/api/mgls/${mgl_id}/remove/${game_id}`, fetchConfig)
        const data = await response.json();
        console.log(data)
        getData();

    }

    useEffect(() => {
        getData();
    }, [id, refresh, token]
    )



    return (
        <div>
            <div>
            <h1>{mgl.name}</h1>
            </div>
            <h2>{mgl.description}</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => {
                        return (
                            <tr key={game.id}>
                                <td><Link class="link" to={`/games/${game.id}`} onClick={() => setRefresh(true)}>
                                    {game.name}
                                </Link></td>
                                <td></td>
                                <td>
                                    <button className="btn btn-warning m-2" onClick={() => {handleRemove(id, game.id)}}>Remove</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <NavLink className="btn btn-info" id="add-game-link" aria-current="page" to="/games">Add games</NavLink>
        </div>
    )
}

export default MGL;
