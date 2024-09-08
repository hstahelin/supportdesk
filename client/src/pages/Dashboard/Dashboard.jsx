import Sidebar from "../../components/Sidebar/Sidebar";
import { isLoggedIn } from "../../utils/session";
import NotLoggedIn from "../../components/NotLoggedIn/NotLoggedIn";
import { useEffect, useState } from "react";

function Dashboard({ Content, ticketsFilter }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn());

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
