import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Alert,
} from "@mui/material";

import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate, isRoleAuthorized } from "../../utils/utils";

function EditTicket() {
  let user = null;
  const userJson = sessionStorage.getItem("user");
  if (userJson) {
    user = JSON.parse(userJson);
  } else {
    console.error("No user found.");
  }
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialvalues] = useState(null);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [assignList, setAssignList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditable, setIsEditable] = useState(true);

  const handleChange = (e) => {
    setTicketInfo({
      ...ticketInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      const user_id = storedUser?.user_id;

      if (!user_id) {
        throw new Error("User not logged in or session expired");
      }

      const updateValues = {
        status_id: ticketInfo.status_id,
        priority_id: ticketInfo.priority_id,
        description: ticketInfo.description,
        assign_user_id: ticketInfo.assign_user_id,
        user_id: user_id,
      };

      await axios.put(`http://localhost:8080/tickets/${id}`, updateValues, {
        withCredentials: true,
      });

      navigate(`/dashboard/tickets/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  async function fetchTicketInfo() {
    try {
      const response = await axios.get(`http://localhost:8080/tickets/${id}`, {
        withCredentials: true,
      });

      setInitialvalues(response.data);
      setTicketInfo(response.data);
      setIsEditable(
        response.data.status !== "Solved" && response.data.status !== "Canceled"
      );
    } catch (error) {
      console.error(error);
      const newMessage = error.response?.data?.message || "An error occurred";
      setErrorMessage((prevMessage) =>
        prevMessage ? `${prevMessage} | ${newMessage}` : newMessage
      );
    }
  }

  async function fetchStatus() {
    console.log("FIX HARDCODED STATUS");
  }

  const fetchAgents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users", {
        params: { role: "Agent" },
        withCredentials: true,
      });

      setAssignList(response.data);
    } catch (error) {
      console.error(error);
      const newMessage = error.response?.data?.message || "An error occurred";
      setErrorMessage((prevMessage) =>
        prevMessage ? `${prevMessage} | ${newMessage}` : newMessage
      );
    }
  };

  useEffect(() => {
    fetchStatus();
    fetchAgents();
    fetchTicketInfo();
    // eslint-disable-next-line
  }, []);

  if (!ticketInfo) {
    return <h1>{errorMessage}</h1>;
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
        <Link
          underline="hover"
          color="inherit"
          href={`/dashboard/tickets/${id}`}
        >
          Detail
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
        <Typography variant="h5">Edit Ticket</Typography>
        {!isEditable && (
          <Alert severity="info">
            Editing is disabled for {ticketInfo.status} tickets. Update the
            status to make changes.
          </Alert>
        )}

        <Card>
          <CardHeader
            title={ticketInfo.title}
            className="card-header"
            titleTypographyProps={{ variant: "h6" }}
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="flex-end"
                  spacing={2}
                  flexDirection="row"
                >
                  <Grid item>
                    <FormControl>
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        sx={{ width: "22svw" }}
                        labelId="status-label"
                        id="status"
                        name="status_id"
                        value={ticketInfo.status_id}
                        label="Status"
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>New</MenuItem>
                        <MenuItem value={2}>In Progress</MenuItem>
                        <MenuItem value={3}>Escalated</MenuItem>
                        <MenuItem value={4}>Solved</MenuItem>
                        <MenuItem value={5}>Canceled</MenuItem>
                        <MenuItem value={6}>Pending</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <FormLabel id="priority-group-label">Priority</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="priority-group-label"
                        name="priority_id"
                        value={ticketInfo.priority_id}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="Low"
                          disabled={!isEditable}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio color="warning" />}
                          label="Medium"
                          disabled={!isEditable}
                        />
                        <FormControlLabel
                          value="1"
                          control={<Radio color="error" />}
                          label="High"
                          disabled={!isEditable}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={0}>
                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={6}
                    value={ticketInfo.description}
                    required
                    onChange={handleChange}
                    disabled={!isEditable}
                  />
                </Paper>
              </Grid>
              {isRoleAuthorized(user.role_id, [
                "Agent",
                "Manager",
                "Team Lead",
              ]) && (
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="assign-label">Assign To</InputLabel>
                      <Select
                        labelId="assign-label"
                        id="assign_user_id"
                        value={ticketInfo.assign_user_id}
                        label="assign"
                        name="assign_user_id"
                        onChange={handleChange}
                        disabled={!isEditable}
                      >
                        {assignList.map((agent) => (
                          <MenuItem key={agent.user_id} value={agent.user_id}>
                            {agent.user_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Paper>
                </Grid>
              )}
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
          <CardActions sx={{ justifyContent: "space-between" }}>
            <Box>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => setTicketInfo(initialValues)}
                sx={{ ml: 1 }}
              >
                Reset
              </Button>
            </Box>
            <Button
              variant="contained"
              onClick={handleSubmit}
              endIcon={<EditNoteTwoToneIcon />}
            >
              Update
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </Box>
  );
}

export default EditTicket;
