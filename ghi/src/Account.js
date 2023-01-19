import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserComponent() {
  const [username, setUsername] = useState("");

  return (
    <div class="card">
      <img src="https://www.w3schools.com/howto/img_avatar.png" />
      <h1>
        <b>{username}</b>
      </h1>
    </div>
  );
}

export default UserComponent;
