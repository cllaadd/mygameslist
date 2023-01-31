import React, { useEffect, useState } from "react";
import { useToken } from "../Auth";
import { useNavigate } from "react-router-dom";
import "../styling/forms.css";

function MGLForm() {
  const noData = {
    name: "",
    description: "",
  };

  const [MGLData, setMGLData] = useState(noData);
  const [token, login] = useToken();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setMGLData({ ...MGLData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const MGLUrl = `${process.env.REACT_APP_API_HOST}/api/mgls/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify({ ...MGLData }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(MGLUrl, fetchConfig);
    if (response.ok) {
      const newMGL = await response.json();
      setMGLData(noData);
      navigate("/mgls");
    } else {
      alert("Could not submit form");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Make a new list</h1>
          <form onSubmit={handleSubmit} id="create-automobile-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={MGLData.name}
                placeholder="Enter a list name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control input-form"
              />
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={MGLData.description}
                placeholder="Enter a description"
                required
                type="text"
                name="description"
                id="description"
                className="form-control input-form"
              />
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MGLForm;
