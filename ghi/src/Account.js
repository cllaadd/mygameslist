import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserComponent() {
  const [username, setUsername] = useState("");

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card">
        <div className="image">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            className="img-fluid"
          />
        </div>
        <div className="mt-5 text-center">
          <h4 className="mb-0">${username}</h4>
          <button className="btn btn-primary btn-sm view list">
            username's games list
          </button>
          <div className="games">
            <h6 className="mb-0">Games</h6>
            <span>50</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserComponent;
