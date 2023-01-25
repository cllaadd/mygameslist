import React, { useState, useEffect } from "react";
import { useToken } from "../Auth";
import { useNavigate} from "react-router-dom";
import '../styling/forms.css';



function AddGameForm({game_id, game_name, game_cover}) {
    const noData = {
        mgl_id: '',
    }
    const [mglData, setMGLData] = useState(noData)
    const [mgls, setMGLs] = useState([])
    // const mgl_id = mglData.id
    const [token] = useToken();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);




    const getMGLs = async () => {
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

    const handleChange = (event) => {
    setMGLData({...mglData, [event.target.name]: event.target.value})
    }


    const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(mglData.mgl_id)
    const mglUrl = `http://localhost:8000/mgls/${mglData.mgl_id}/add/${game_id}`;
    const fetchConfig = {
        method: 'put',
        body: JSON.stringify({...mglData}),
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
    };
    const response = await fetch(mglUrl, fetchConfig);
    if (response.ok) {
        const addedGame = await response.json();
        console.log(addedGame)
        setMGLData(noData)
    } else {
        alert("Could not add game")
    }

    }

    useEffect(() => {
    if (isOpen) {
        getMGLs()
    } else {
      handleSubmit()
    //   navigate(`mgls/${mgl_id}`)
    }
    }, [isOpen, token, mglData]);

        return (
            <div className="form">
                <div className="form-content">
                    <div className="shadow p-4 mt-4">
                        <h1>Which list would you like to add {game_name} to?</h1>
                        <img src={game_cover}></img>
                        <form onSubmit={handleSubmit} id="add-game-form">
                            <div className="mb-3">
                                <select onChange={handleChange} required id="mgl_id" name="mgl_id" className="form-select">
                                    <option value="">Choose a list</option>
                                    {mgls.map(mgl => {
                                        return (
                                            <option key={mgl.id} value={mgl.id}>
                                                {mgl.name}
                                            </option>
                                        )
                                    })};
                                </select>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="btn btn-primary">Add game</button>
                        </form>
                    </div>
                </div>
            </div>
        );

};

export default AddGameForm;
