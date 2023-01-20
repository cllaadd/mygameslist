import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useToken } from "./Auth";
import LoginComponent from "./Login";
import LogoutComponent from "./Logout";
import SignupComponent from "./Signup";
import HomePageComponent from "./HomePage";
import Nav from "./Nav";
import UsersList from "./UsersList";
import AllGamesList from "./AllGamesList";
import Account from "./Account";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <AuthProvider>
        <GetToken />
        <Routes>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route path="/logout" element={<LogoutComponent />}></Route>
          <Route path="/signup" element={<SignupComponent />}></Route>
          <Route path="/" element={<HomePageComponent />}></Route>
          <Route path="/users" element={<UsersList />}></Route>
          <Route path="/games" element={<AllGamesList />}></Route>
          <Route path="/account" element={<Account />}></Route>
          {/* <Route path="/account/{account_id}" element={<Account />}></Route> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
