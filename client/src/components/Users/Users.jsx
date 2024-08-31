import axios from "axios";

import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  Divider,
} from "@mui/material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./Users.scss";
function Users() {
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);

  const fetchUsersData = async () => {
    try {
      console.log("FIX API CALL, hardcoded user id");
      const response = await axios.get("http://localhost:8080/users/2");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCustomersData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/users?role=Customer"
      );
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUsersData();
    fetchCustomersData();
  }, []);

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
