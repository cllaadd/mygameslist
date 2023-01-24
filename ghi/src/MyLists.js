import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useToken } from "./Auth";

function MyLists() {
    const [mgls, setMGLs] = useState([])
    const [token] = useToken();

    const getData = async () => {
        const fetchConfig = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
        };
        const response = await fetch('http://localhost:8000/mgls/', fetchConfig)
        if (response.ok) {
            const data = await response.json()
            setMGLs(data.mgls)
              } else {
                alert("Could not find lists")
    }
    }

    const goToList = async (mgl_id) => {
        const fetchConfig = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const response = await fetch(`http://localhost:8000/mgls/${mgl_id}`, fetchConfig)
        const data = await response.json();
    }


    const handleDelete = async (mgl_id) => {
        const fetchConfig = {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const response = await fetch(`http://localhost:8000/mgls/${mgl_id}`, fetchConfig)
        const data = await response.json();
        getData();
    }


    useEffect(() => {
        if (token) {
        getData(); }
    }, [token]
    )



    return (
        <div>
            <h1>My Game Lists</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {mgls.map(mgl => {
                        return (
                            <tr key={mgl.id}>
                                <td>{mgl.name}</td>
                                <td>{mgl.description}</td>
                                <td><NavLink className="btn btn-primary" id="mgl-link" aria-current="page" to={"/mgls/:id"}>See list</NavLink></td>
                                <td>
                                    <button className="btn btn-danger m-2" onClick={() => {handleDelete(mgl.id)}}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <NavLink className="btn btn-primary" id="add-mgl-link" aria-current="page" to="/mgls/new">Add new list</NavLink>
        </div>
    )
}

export default MyLists;
