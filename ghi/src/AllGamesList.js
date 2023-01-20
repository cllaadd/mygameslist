import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Pagination } from 'react-bootstrap';

function AllGamesList() {
    const [games, setgames] = useState([])
    const [limit, setLimit] = useState([])
    const [offset, setOffset] = useState([])

    const getGameData = async () => {
        // const gamesUrl = 'http://localhost:8000/api/games/'
        // const fetchConfig = {query:{"limit": limit, "offset": offset}}
        const response = await fetch('http://localhost:8000/games/')
        const gameData = await response.json()
        setgames(gameData.games)
    }

    useEffect(() => {
        getGameData();
    }, []
    )

    return (
        <div>
            <h1>All Games</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {games?.map(game => {
                        return (
                            <tr key={game.id}>
                                <td>{game.name}</td>
                                <td><img src={game.cover} className="img-fluid" /></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AllGamesList;
