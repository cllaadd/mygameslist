import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function UsersList() {
    const [users, setUsers] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8000/api/accounts/')
        const user_data = await response.json()
        console.log(user_data)
        setUsers(user_data)
    }

    useEffect(() => {
        getData();
    }, []
    )

    return (
        <div>
            <h1>Users</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>username</th>
                    </tr>
                </thead>
                {/* <tbody>
                    {data?.map(account => {
                        return (
                            <tr key={account.id}>
                                <td>{account.username}</td>
                            </tr>
                        );
                    })}
                </tbody> */}
            </table>
        </div>
    )
}

export default UsersList
