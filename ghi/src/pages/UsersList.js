import { useState, useEffect } from "react";
import "../styling/mgl.css";

function UsersList() {
    const [users, setUsers] = useState([])

    const getUserData = async () => {
        const response = await fetch('http://localhost:8000/api/accounts/')
        const userData = await response.json()
        console.log(userData)
        setUsers(userData)
    }

    useEffect(() => {
        getUserData();
    }, []
    )

    return (
        <div>
            <h1>Users</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>username</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>
                                    {user.username}
                                </td>
                                <td></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default UsersList
