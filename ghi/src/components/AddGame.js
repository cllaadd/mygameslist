import React from "react";
import { useToken } from "../Auth";
import { useNavigate, useLocation } from "react-router-dom";


function AddGame() {
    const location = useLocation();
    const game_id = location.state["id"]
    const game_name = location.state["name"]
    const game_cover = location.state["cover"]
    const [mglData, setMGLData] = useState({
        mgl: '',
    })
    const [mgls, setMGLs] = useState([])
    const [token] = useToken();
    const navigate = useNavigate();


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


    useEffect(() => {
        getMGLs()
      }, [token])

    const handleChange = (event) => {
    setMGLData({...mglData, [event.target.name]: event.target.value})
    }


    const handleSubmit = async (event) => {
    event.preventDefault();

    const mglUrl = `http://localhost:8000/mgls/${mgl_id}/add/${game_id}`;
    const fetchConfig = {
        method: 'put',
        body: JSON.stringify({...mglData}),
        headers: {
        'Content-Type': 'application/json',
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




    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Which list would you like to add {game_name} to?</h1>
                        <img src={game_cover}></img>
                        <form onSubmit={handleSubmit} id="add-game-form">
                            <div className="mb-3">
                                <select onChange={handleChange} required id="mgl" name="mgl" className="form-select">
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
                            <button className="btn btn-primary">Add game</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};

export default AddGameForm;
