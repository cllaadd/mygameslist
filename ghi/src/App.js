import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { AuthProvider, useToken } from "./utils";
import LoginForm from './Login';

function GetToken() {
    // Get token from JWT cookie (if already logged in)
    useToken();
    return null
}

function App() {
  return (
    <BrowserRouter>
        <AuthProvider>
            <GetToken />
                <Routes>
                  <Route path = "/login" element={<LoginForm />} ></Route>
                </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
