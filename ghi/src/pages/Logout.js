import { useToken } from "../Auth";

function LogoutComponent() {
  const [token, , logout, ,] = useToken();
  logout(token);
}

export default LogoutComponent;
