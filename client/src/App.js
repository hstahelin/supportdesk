import "./App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { ColorModeProvider } from "./contexts/ColorModeContext";
import { ThemeProvider } from "./themes/ThemeProvider";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Overview from "./components/Overview/Overview";
import MyTickets from "./components/MyTickets/MyTickets";
import NotFound from "./pages/NotFound/NotFound";
import Users from "./components/Users/Users";
import Notifications from "./components/Notifications/Notifications";
import KB from "./components/KB/KB";

function App() {
  // eslint-disable-next-line
  const [user, setUser] = useState(null);

  return (
    <ColorModeProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={<Dashboard Content={Overview} />}
            />
            <Route
              path="/dashboard/tickets"
              element={<Dashboard Content={MyTickets} />}
            />
            <Route
              path="/dashboard/users"
              element={<Dashboard Content={Users} />}
            />
            <Route
              path="/dashboard/notifications"
              element={<Dashboard Content={Notifications} />}
            />
            <Route path="/dashboard/kb" element={<Dashboard Content={KB} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeProvider>
  );
}

export default App;
