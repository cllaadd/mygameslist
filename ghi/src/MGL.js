import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useToken } from "./Auth";

function MGL() {
    const [games, setGames] = useState([])
    const [mgl, setMGL] = useState([])
    const [refresh, setRefresh] = useState(false)
    const {id} = useParams()
    const [token] = useToken();
    const [filterValue, setFilter] = useState("");


    const handleChange = (event) => {
        setFilter(event.target.value);
    };


    const getData = async () => {
        const response = await fetch(`http://localhost:8000/mgls/${id}/`)
        const data = await response.json()
        setMGL(data)
        setGames(data.games)
        setRefresh(false);
    }

    const handleRemove = async (mgl_id, game_id) => {
        const fetchConfig = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const response = await fetch(`http://localhost:8000/mgls/${mgl_id}/remove/${game_id}`, fetchConfig)
        const data = await response.json();
        console.log(data)
        getData();
        window.location = `/mgls/${mgl_id}`
    }

    useEffect(() => {
        getData();
    }, [id, refresh, token]
    )

    let filteredGames = [];
    if (filterValue === "") {
        filteredGames = games;
    } else {
        filteredGames = games.filter((game) =>
            (game.name).includes(filterValue)
        );
    }


    return (
        <div>
            <div>
                <input className="form-control" value={filterValue} onChange={handleChange} placeholder="Search" />
            </div>
            <h1>{mgl.name}</h1>
            <h2>{mgl.description}</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Cover</th>
                        <th>Category</th>
                        <th>Summary</th>
                        <th>Rating</th>
                        <th>Release date</th>
                        {/* <th>Other names</th> */}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredGames.map(game => {
                        return (
                            <tr key={game.id}>
                                <td>{game.name}</td>
                                <td><image src={game.cover}></image></td>
                                <td>{game.category}</td>
                                <td>{game.summary}</td>
                                <td>{game.total_rating}</td>
                                <td>{game.first_release_date}</td>
                                {/* <td>{game.alternative_names}</td> */}
                                <td>
                                    <button className="btn btn-danger m-2" onClick={() => {handleRemove(game.id)}}>Remove</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <NavLink className="btn btn-primary" id="add-game-link" aria-current="page" to="games">Add games</NavLink>
        </div>
    )
}

export default MGL;
