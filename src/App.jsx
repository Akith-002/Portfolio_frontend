import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import AdminPage from "./pages/AdminPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signin"
            element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/admin"
            element={
              isAuthenticated ? <AdminPage /> : <Navigate to="/signin" />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
