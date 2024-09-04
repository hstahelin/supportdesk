import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Sidebar from "../../components/Sidebar/Sidebar";

function Dashboard({ Content, ticketsFilter }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Failed to parse user data from sessionStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/"); // Redirect to the home page if not logged in
    }
  }, [isLoading, isLoggedIn, navigate]);

  if (isLoading) {
    return (
      <div>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

  if (isLoggedIn) {
    return <Sidebar Content={Content} ticketsFilter={ticketsFilter} />;
  }

  return null;
}

export default Dashboard;
