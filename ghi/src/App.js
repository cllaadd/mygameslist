import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useToken } from "./Auth";
import LoginComponent from "./Login";
import LogoutComponent from "./Logout";
import SignupComponent from "./Signup";
import MainPageComponent from "./MainPage";
import Nav from "./Nav";
import UsersList from "./UsersList";
import AllGamesList from "./AllGamesList";
import Account from "./Account";
import GameDetail from "./GameDetail";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {
  return (
    <BrowserRouter>
    {/* <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
    <div id="stars4"></div> */}
      <Nav />
      <AuthProvider>
        <GetToken />
        <Routes>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route path="/logout" element={<LogoutComponent />}></Route>
          <Route path="/signup" element={<SignupComponent />}></Route>
          <Route path="/MainPage" element={<MainPageComponent />}></Route>
          <Route path="/users" element={<UsersList />}></Route>
          <Route path="/games" element={<AllGamesList />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/games/:id" element={<GameDetail />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
