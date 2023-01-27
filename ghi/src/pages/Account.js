import "../styling/Account.css";
import { useAuthContext } from "../Auth";
import { useEffect, useState } from "react";

function UserComponent() {
  const [user, setUser] = useState([]);
  const { token } = useAuthContext();

  const getCurrentUser = async () => {
    const response = await fetch("http://localhost:8000/api/token/", {
      credentials: "include",
    });
    console.log(response);
    const userData = await response.json();
    console.log(userData);
    console.log(userData.account);
    setUser(userData);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  console.log("user:");
  console.log(user);

  return <div>user: {user}</div>;
}

export default UserComponent;
