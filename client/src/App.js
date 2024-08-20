import "./App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
