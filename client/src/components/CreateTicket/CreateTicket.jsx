import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  Divider,
  TextField,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Alert,
} from "@mui/material";
import "./CreateTicket.scss";

function CreateTicket() {
  let user = null;
  const userJson = sessionStorage.getItem("user");
  if (userJson) {
    user = JSON.parse(userJson);
  } else {
    console.error("No user found.");
  }

  const navigate = useNavigate();

  const initialValues = {
    title: "",
    description: "",
    priority: 3,
    assign: "",
    user_id: user.user_id,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [isFormValid, setIsFormValid] = useState({
    title: true,
    description: true,
  });

  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const isFieldValid = (field) => {
      return Boolean(field.trim());
    };
    if (
      !isFieldValid(formValues.title) ||
      !isFieldValid(formValues.description)
    ) {
      setIsFormValid({
        title: isFieldValid(formValues.title),
        description: isFieldValid(formValues.description),
      });
      return;
    }
    try {
      // const response =
      await axios.post("http://localhost:8080/tickets", formValues);
      navigate("/dashboard/tickets");
    } catch (error) {
      console.error(error);
      setSubmitError("Something went wrong, try again.");
    }
  };

  const [agents, setAgents] = useState([]);
  const fetchAgents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users", {
        params: { role: "Agent" },
      });

      setAgents(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAgents();
  }, []);
  return (
    <Box component="section" sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        <Typography color="text.primary">Create Ticket</Typography>
      </Breadcrumbs>

      <Paper elevation={4} square={false}>
        <Divider />
        <Typography variant="h5" p={2}>
          Create New Ticket
        </Typography>
        <Stack spacing={2} p={4}>
          <TextField
            id="title"
            name="title"
            label="Title"
            variant="outlined"
            placeholder="Brief summary of the issue"
            value={formValues.title}
            onChange={handleChange}
            error={!isFormValid.title}
            helperText={!isFormValid.title ? "Title is required." : ""}
            required
          />
          <TextField
            id="description"
            name="description"
            label="Description"
            multiline
            rows={8}
            placeholder="Describe the issue in detail, including any steps to reproduce it."
            value={formValues.description}
            onChange={handleChange}
            error={!isFormValid.description}
            helperText={
              !isFormValid.description ? "Description is required." : ""
            }
            required
          />
          <FormControl>
            <FormLabel id="priority-group-label">Priority</FormLabel>
            <RadioGroup
              row
              aria-labelledby="priority-group-label"
              name="priority"
              value={formValues.priority}
              onChange={handleChange}
            >
              <FormControlLabel value="3" control={<Radio />} label="Low" />
              <FormControlLabel
                value="2"
                control={<Radio color="warning" />}
                label="Medium"
              />
              <FormControlLabel
                value="1"
                control={<Radio color="error" />}
                label="High"
              />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="assign-label">Assign to</InputLabel>
            <Select
              labelId="assign-label"
              id="assign"
              name="assign"
              value={formValues.assign}
              label="Assign to"
              onChange={handleChange}
            >
              {agents.map((agent) => (
                <MenuItem key={agent.user_id} value={agent.user_id}>
                  {agent.user_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Divider />
          {submitError && <Alert severity="error">{submitError}</Alert>}
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="flex-end"
            alignItems="stretch"
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setFormValues(initialValues)}
            >
              Clear
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Create
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

export default CreateTicket;
