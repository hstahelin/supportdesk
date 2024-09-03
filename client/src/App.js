import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ColorModeProvider } from "./contexts/ColorModeContext";
import { ThemeProvider } from "./themes/ThemeProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import NotFound from "./pages/NotFound/NotFound";
import "./App.scss";
import CreateTicket from "./components/CreateTicket/CreateTicket";
import TicketDetails from "./components/TicketDetails/TicketDetails";
import ViewKB from "./components/ViewKB/ViewKB";
import CreateKB from "./components/CreateKB/CreateKB";
import EditTicket from "./EditTicket/EditTicket";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Overview = lazy(() => import("./components/Overview/Overview"));
const MyTickets = lazy(() => import("./components/MyTickets/MyTickets"));
const Users = lazy(() => import("./components/Users/Users"));
const Notifications = lazy(() =>
  import("./components/Notifications/Notifications")
);
const KB = lazy(() => import("./components/KB/KB"));

function App() {
  return (
    <ColorModeProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Suspense fallback={<CircularProgress />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard/*" element={<DashboardRoutes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeProvider>
  );
}

function DashboardRoutes() {
  return (
    <Routes>
      <Route path="" element={<Dashboard Content={Overview} />} />
      <Route path="tickets" element={<Dashboard Content={MyTickets} />} />
      <Route
        path="tickets/:id"
        element={<Dashboard Content={TicketDetails} />}
      />
      <Route
        path="tickets/:id/edit"
        element={<Dashboard Content={EditTicket} />}
      />
      <Route
        path="createticket"
        element={<Dashboard Content={CreateTicket} />}
      />

      <Route path="users" element={<Dashboard Content={Users} />} />
      <Route
        path="notifications"
        element={<Dashboard Content={Notifications} />}
      />
      <Route path="kb" element={<Dashboard Content={KB} />} />
      <Route path="kb/create" element={<Dashboard Content={CreateKB} />} />
      <Route path="kb/:id" element={<Dashboard Content={ViewKB} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
