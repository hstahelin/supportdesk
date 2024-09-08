import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  Card,
  CardContent,
  CardHeader,
  ListItemIcon,
} from "@mui/material";

import { List, ListItem } from "@mui/material";
import ConfirmationNumberTwoToneIcon from "@mui/icons-material/ConfirmationNumberTwoTone";
import { formatDate } from "../../utils/utils";
import NotData from "../NoData/NoData";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";
import Loading from "../Loading/Loading";

function Notifications() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([]);

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

  async function fetchNotifications() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users/notifications`,
        { withCredentials: true }
      );

      setNotifications(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsNotLoggedIn(true);
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  if (isNotLoggedIn) return <NotLoggedIn />;
  if (isLoading) return <Loading />;
  return (
    <Box component="section" sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        <Typography color="text.primary">Notifications</Typography>
      </Breadcrumbs>

      <Paper
        elevation={4}
        square={false}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginTop: 2,
        }}
      >
        <Typography variant="h5">Notifications</Typography>
        {notifications.length === 0 ? (
          <NotData />
        ) : (
          <List>
            {notifications.map((item) => (
              <React.Fragment
                key={`${item.ticket_id}-${item.name}-${item.created_at}`}
              >
                <ListItem>
                  <ListItemIcon>
                    <ConfirmationNumberTwoToneIcon fontSize="large" />
                  </ListItemIcon>
                  <Card sx={{ width: "100%" }} raised>
                    <CardHeader
                      title={`Ticket: ${item.title}`}
                      subheader={formatDate(item.created_at)}
                    />

                    {item.category === "COMMENT" ? (
                      <CardContent>
                        <Typography variant="h6">
                          New <b>{item.category}</b> by: <b>{item.name}</b>
                        </Typography>
                      </CardContent>
                    ) : (
                      <CardContent>
                        <Typography variant="h6">
                          <b>{item.category}</b> set to: <b>{item.name}</b>
                        </Typography>
                      </CardContent>
                    )}
                  </Card>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}

export default Notifications;
