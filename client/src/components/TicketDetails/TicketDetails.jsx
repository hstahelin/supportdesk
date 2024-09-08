import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/utils";

import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  Stack,
  Card,
  CardHeader,
  Grid,
  CardContent,
  Chip,
  Button,
} from "@mui/material";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";

import TicketComments from "../TicketComments/TicketComments";
import TicketHistory from "../TicketHistory/TicketHistory";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";
import Loading from "../Loading/Loading";
import NotData from "../NoData/NoData";

import "./TicketDetails.scss";

function TicketDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [ticketInfo, setTicketInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [remountKey, setRemountKey] = useState(true);

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

  async function fetchTicketInfo() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/tickets/${id}`,
        {
          withCredentials: true,
        }
      );

      setTicketInfo(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsNotLoggedIn(true);
        setErrorMessage(error.response?.data?.message || "Not Authorized");
      } else {
        console.error(error);
        setErrorMessage(error.response?.data?.message || "An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTicketInfo();
    // eslint-disable-next-line
  }, [id, remountKey, user]);

  async function addComment(newComment, userId = user.user_id) {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/tickets/${id}/comments`,
        {
          comments: newComment,
          comments_by: userId,
        },
        { withCredentials: true }
      );
      fetchTicketInfo();
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while adding the comment"
      );
    }
  }

  function formatStatus(value) {
    const status = value;
    let color = "default";
    let variant = "outlined";
    let disabled = false;

    if (status === "New") color = "primary";
    else if (status === "In Progress") color = "secondary";
    else if (status === "Escalated") {
      color = "error";
      variant = "default";
    } else if (status === "Solved") color = "success";
    else if (status === "Canceled") {
      color = "default";
      disabled = true;
      variant = "default";
    } else if (status === "Pending") {
      color = "warning";
      disabled = true;
    }

    return (
      <Chip
        label={`STATUS: ${status}`}
        color={color}
        variant={variant}
        disabled={disabled}
        sx={{ padding: 2, fontSize: "18px", fontWeight: "bold" }}
      />
    );
  }

  function formatPriority(value) {
    const priority = value;
    let color = "default";
    let variant = "outlined";

    if (priority === "High") color = "error";
    else if (priority === "Medium") color = "warning";
    else if (priority === "Low") color = "success";

    return (
      <Chip
        label={`PRIORITY: ${priority}`}
        color={color}
        variant={variant}
        sx={{ padding: 2, fontSize: "18px", fontWeight: "bold" }}
      />
    );
  }

  const ticketEdit = (ticketId) => {
    navigate(`/dashboard/tickets/${ticketId}/edit`);
  };

  if (isNotLoggedIn) return <NotLoggedIn errorMessage={errorMessage} />;
  if (isLoading) return <Loading />;
  if (!ticketInfo) return <NotData errorMessage={errorMessage} />;

  return (
    <Box component="section" sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        <Link underline="hover" color="inherit" href="/dashboard/tickets">
          Tickets
        </Link>
        <Typography color="text.primary">{id}</Typography>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Ticket {id} Details</Typography>

          <Button
            variant="contained"
            size="large"
            color="secondary"
            endIcon={<EditNoteTwoToneIcon />}
            onClick={() => ticketEdit(id)}
          >
            Edit
          </Button>
        </Box>

        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="space-evenly"
          alignItems="stretch"
        >
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              <Card>
                <CardHeader
                  title={ticketInfo.title}
                  className="card-header"
                  titleTypographyProps={{ variant: "h6" }}
                />
                <CardContent>
                  <Grid
                    container
                    spacing={2}
                    alignItems="stretch"
                    justifyContent="center"
                  >
                    <Grid item xs={12}>
                      <Grid container justifyContent="flex-end" spacing={2}>
                        <Grid item>{formatStatus(ticketInfo.status)}</Grid>
                        <Grid item>{formatPriority(ticketInfo.priority)}</Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper elevation={0} sx={{ p: 2 }}>
                        <Typography variant="button" gutterBottom>
                          Description
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {ticketInfo.description}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="button" gutterBottom>
                          Creation Date
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {formatDate(ticketInfo.created_at)}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="button" gutterBottom>
                          Last Update Date
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {formatDate(ticketInfo.last_change_date)}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="button" gutterBottom>
                          Assigned to
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {ticketInfo.assign_first_name
                            ? `${ticketInfo.assign_first_name} ${ticketInfo.assign_last_name}`
                            : "Not Assigned"}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="button" gutterBottom>
                          Created by
                        </Typography>
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "100%",
                          }}
                        >
                          {ticketInfo.created_email}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <TicketComments
                ticketId={id}
                addComment={addComment}
                setRemountKey={setRemountKey}
                input={ticketInfo.description}
                ticketInfo={ticketInfo}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <TicketHistory ticketId={id} remountKey={remountKey} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default TicketDetails;
