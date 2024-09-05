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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils/utils";
import NotData from "../NoData/NoData";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  async function fetchNotifications() {
    try {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      const user_id = storedUser?.user_id;

      if (!user_id) {
        throw new Error("User not logged in or session expired");
      }

      const response = await axios.get(
        `http://localhost:8080/users/notifications`,
        { withCredentials: true }
      );

      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  // if (notifications.length === 0) {
  //   return <NotData />;
  // }
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
