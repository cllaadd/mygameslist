import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useToken } from "./Auth";
import LoginComponent from './Login';

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
                  <Route path = "/login" element={<LoginComponent />} ></Route>
                </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
