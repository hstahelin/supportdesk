import Sidebar from "../../components/Sidebar/Sidebar";
import { isLoggedIn } from "../../utils/session";
import NotLoggedIn from "../../components/NotLoggedIn/NotLoggedIn";
import { useEffect, useState } from "react";

function Dashboard({ Content, ticketsFilter }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn());

  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   try {
  //     const user = JSON.parse(sessionStorage.getItem("user"));
  //     if (user) {
  //       setIsLoggedIn(true);
  //     }
  //   } catch (error) {
  //     console.error("Failed to parse user data from sessionStorage:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  // useEffect(() => {

  //   if (!isLoading && !isLoggedIn()) {
  //     navigate("/"); // Redirect to the home page if not logged in
  //   }
  // }, [isLoading, isLoggedIn, navigate]);

  // if (isLoading) {
  //   return (
  //     <div>
  //       <Backdrop
  //         sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
  //         open={true}
  //       >
  //         <CircularProgress color="inherit" />
  //       </Backdrop>
  //     </div>
  //   );
  // }
  // eslint-disable-next-line
  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn());
  });

  if (isLoggedIn() && isUserLoggedIn) {
    return <Sidebar Content={Content} ticketsFilter={ticketsFilter} />;
  }

  return <NotLoggedIn />;
}

export default Dashboard;
