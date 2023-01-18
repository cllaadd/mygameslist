import { useToken } from "./Auth"
import { useNavigate } from "react-router-dom";

function LogoutComponent() {
    const [token, , logout, ,] = useToken();
    const navigate = useNavigate();
    logout(token);
    // navigate("/")
}

export default LogoutComponent;
