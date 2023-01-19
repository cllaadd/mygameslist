import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserComponent() {
  const [username, setUsername] = useState("");

  return (
    <div class="container d-flex justify-content-center align-items-center">
      <div class="card">
        <div class="image">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            class="img-fluid"
          />
        </div>
        <div class="mt-5 text-center">
          <h4 class="mb-0">username</h4>
          <button class="btn btn-primary btn-sm view list">
            username's games list
          </button>
          <div class="games">
            <h6 class="mb-0">Games</h6>
            <span>50</span>
          </div>
        </div>
      </div>
    </div>
  );
}
