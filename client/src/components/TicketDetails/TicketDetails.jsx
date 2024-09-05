import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
import "./TicketDetails.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import TicketComments from "../TicketComments/TicketComments";
import { formatDate } from "../../utils/utils";
import TicketHistory from "../TicketHistory/TicketHistory";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";

function TicketDetails() {
  const navigate = useNavigate();

  let user = null;
  const userJson = sessionStorage.getItem("user");
  if (userJson) {
    user = JSON.parse(userJson);
  } else {
    console.error("No user found.");
  }
  const { id } = useParams();
  const [ticketInfo, setTicketInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [remountKey, setRemountKey] = useState(true);

  async function fetchTicketInfo() {
    try {
      const response = await axios.get(`http://localhost:8080/tickets/${id}`, {
        withCredentials: true,
      });

      setTicketInfo(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    }
  }

  useEffect(() => {
    fetchTicketInfo();
    // eslint-disable-next-line
  }, [id, remountKey]);

  async function addComment(newComment, userId = user.user_id) {
    try {
      await axios.post(
        `http://localhost:8080/tickets/${id}/comments`,
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
    }

    return (
      <Chip
        label={status}
        color={color}
        variant={variant}
        disabled={disabled}
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

    return <Chip label={priority} color={color} variant={variant} />;
  }

  const ticketEdit = (ticketId) => {
    navigate(`/dashboard/tickets/${ticketId}/edit`);
  };

  if (!ticketInfo) {
    return <NotLoggedIn errorMessage={errorMessage} />;
  }
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
                        <Grid item>
                          {/* <Chip label={ticketInfo.status} /> */}
                          {formatStatus(ticketInfo.status)}
                        </Grid>
                        <Grid item>
                          {/* <Chip label={ticketInfo.priority} /> */}
                          {formatPriority(ticketInfo.priority)}
                        </Grid>
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
                    {/* <Grid item xs={12} sm={6} lg={4} xl={3}>
                      PAPER

                    </Grid> */}
                  </Grid>
                </CardContent>
              </Card>
              <TicketComments
                ticketId={id}
                addComment={addComment}
                setRemountKey={setRemountKey}
                input={ticketInfo.description}
              />
              {/* <Card>
                <CardHeader title="Comments" className="card-header" />
              </Card> */}
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <TicketHistory ticketId={id} remountKey={remountKey} />
            {/* <Card>
              <CardHeader title="History" className="card-header" />
            </Card> */}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default TicketDetails;
