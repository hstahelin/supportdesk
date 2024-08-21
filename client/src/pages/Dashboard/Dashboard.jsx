import MyTickets from "../../components/MyTickets/MyTickets";
import Sidebar from "../../components/Sidebar/Sidebar";

function Dashboard() {
  return <Sidebar Content={MyTickets} />;
}

export default Dashboard;
