import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useToken } from "./Auth";
import LoginComponent from "./Login";
import LogoutComponent from "./Logout";
import SignupComponent from "./Signup";
import AccountComponent from "./Account";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GetToken />
        <Routes>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route path="/logout" element={<LogoutComponent />}></Route>
          <Route path="/signup" element={<SignupComponent />}></Route>
          <Route path="/account" element={<AccountComponent />}></Route>
          <Route path="/" element={<h1>Home</h1>}></Route>
          <Route path="/account" element={<AccountComponent />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
