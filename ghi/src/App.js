import "./styling/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useToken } from "./Auth";
import LoginComponent from "./pages/Login";
import LogoutComponent from "./pages/Logout";
import SignupComponent from "./pages/Signup";
import MainPageComponent from "./pages/MainPage";
import Nav from "./components/Nav";
import UsersList from "./pages/UsersList";
import AllGamesList from "./pages/AllGamesList";
import Account from "./pages/Account";
import GameDetail from "./pages/GameDetail";
import GameSearchID from "./pages/GameSearchID";
import MGL from "./pages/MGL";
import MGLForm from "./pages/NewMGLForm";
import MyMGLs from "./pages/MyMGLs";
import SearchResults from "./pages/name_search_results";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <AuthProvider>
        <GetToken />
        <Routes>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route path="/logout" element={<LogoutComponent />}></Route>
          <Route path="/signup" element={<SignupComponent />}></Route>
          <Route path="/MainPage" element={<MainPageComponent />}></Route>
          <Route path="/" element={<MainPageComponent />}></Route>
          <Route path="/users" element={<UsersList />}></Route>
          <Route path="/games" element={<AllGamesList />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/games/:id" element={<GameDetail />}></Route>
          <Route path="/games/idsearch/" element={<GameSearchID />}></Route>
          <Route path="/searchresults" element={<SearchResults/>}></Route>
          <Route path="/mgls" element={<MyMGLs />}></Route>
          <Route path="/mgls/:id" element={<MGL />}></Route>
          <Route path="/mgls/new" element={<MGLForm />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
