import React, { useEffect, useState } from "react";
import { useToken } from "./Auth";



function MGLForm() {
  const noData = {
    name: "",
    description: "",
  }

  const [MGLData, setMGLData] = useState(noData)
  const [token] = useToken();

  const handleChange = (event) => {
    setMGLData({...MGLData, [event.target.name]: event.target.value})
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const MGLUrl = `http://localhost:8000/mgls/`;
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify({...MGLData}),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const response = await fetch(MGLUrl, fetchConfig);
    if (response.ok) {
      const newMGL = await response.json();
      setMGLData(noData)
    } else {
      alert("Could not submit form")
    }
  }


    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Make a new list</h1>
            <form onSubmit={handleSubmit} id="create-automobile-form">
              <div className="form-floating mb-3">
                <input onChange={handleChange} value={MGLData.name} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleChange} value={MGLData.description} placeholder="description" required type="text" name="description" id="description" className="form-control" />
                <label htmlFor="description">Description</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

export default MGLForm;
