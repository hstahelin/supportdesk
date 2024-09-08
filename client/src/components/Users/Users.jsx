import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";
import Loading from "../Loading/Loading";
import "./Users.scss";

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(false);

  useEffect(() => {
    const userJson = sessionStorage.getItem("user");
    if (userJson) {
      const parsedUser = JSON.parse(userJson);
      setUser(parsedUser);
    } else {
      setIsNotLoggedIn(true);
      setIsLoading(false);
    }
  }, []);

  const fetchDataWithErrorHandling = async (url, setData) => {
    try {
      const response = await axios(url, { withCredentials: true });
      setData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsNotLoggedIn(true);
      } else {
        console.error(error);
      }
    }
  };

  const fetchUsersData = () =>
    fetchDataWithErrorHandling(
      `${process.env.REACT_APP_API_BASE_URL}/users/${user.user_id}/reportingUsers`,
      setUsers
    );

  const fetchCustomersData = () =>
    fetchDataWithErrorHandling(
      `${process.env.REACT_APP_API_BASE_URL}/users?role=Customer`,
      setCustomers
    );

  useEffect(() => {
    if (user) {
      const fetchAllData = async () => {
        setIsLoading(true);
        await Promise.all([fetchUsersData(), fetchCustomersData()]);
        setIsLoading(false);
      };
      fetchAllData();
    }
    // eslint-disable-next-line
  }, [user]);

  if (isNotLoggedIn) return <NotLoggedIn />;
  if (isLoading) return <Loading />;
  return (
    <Box component="section" sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        <Typography color="text.primary">Users & Roles</Typography>
      </Breadcrumbs>

      <Paper
        elevation={1}
        square={false}
        sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5">Users & Roles</Typography>
        <TableContainer component={Paper} elevation={6}>
          <Table aria-label="Users table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left" className="table--header">
                  Name
                </TableCell>
                <TableCell align="left" className="table--header">
                  Email
                </TableCell>
                <TableCell align="right" className="table--header">
                  Role
                </TableCell>
                <TableCell align="right" className="table--header">
                  Manager
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell
                    align="left"
                    className={`level-${user.level}`}
                    component="th"
                    scope="row"
                  >
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(`/dashboard/users/${user.user_id}`)
                      }
                    >
                      <EditNoteTwoToneIcon />
                    </IconButton>
                    {user.user_name}
                  </TableCell>

                  <TableCell align="left">{user.user_email}</TableCell>
                  <TableCell align="right">{user.user_role}</TableCell>
                  <TableCell align="right">{user.manager_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        <Typography variant="h5">Customers</Typography>
        <TableContainer component={Paper} elevation={6}>
          <Table size="small" aria-label="Customers table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left" className="table--header">
                  Name
                </TableCell>
                <TableCell align="left" className="table--header">
                  Email
                </TableCell>
                <TableCell align="right" className="table--header">
                  Role
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell align="left" component="th" scope="row">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(`/dashboard/users/${user.user_id}`)
                      }
                    >
                      <EditNoteTwoToneIcon />
                    </IconButton>
                    {user.user_name}
                  </TableCell>
                  <TableCell align="left">{user.user_email}</TableCell>
                  <TableCell align="right">{user.user_role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default Users;
