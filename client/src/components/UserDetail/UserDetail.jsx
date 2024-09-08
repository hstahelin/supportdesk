import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Breadcrumbs, Link, Paper } from "@mui/material";
import {
  TextField,
  Button,
  Stack,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Alert,
} from "@mui/material";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";
import Loading from "../Loading/Loading";

function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  // const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const [initialValues, setInitialValues] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [managers, setManagers] = useState([]);
  const [submitError, setSubmitError] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(false);

  useEffect(() => {
    const userJson = sessionStorage.getItem("user");
    if (userJson) {
      setUser(JSON.parse(userJson));
      fetchUsersData();
    } else {
      setIsNotLoggedIn(true);
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  async function fetchUsersData() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users/${id}`,
        {
          withCredentials: true,
        }
      );
      setUserInfo(response.data);
      setInitialValues(response.data);
    } catch (error) {
      setFetchError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchManagerData = async () => {
    try {
      const { data: managers } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users/${user.user_id}/reportingUsers`,
        {
          withCredentials: true,
        }
      );

      const filteredManagers = managers.filter(({ user_id }) => user_id !== id);

      setManagers(filteredManagers);
    } catch (error) {
      console.error("Failed to fetch manager data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchManagerData();
    }
    // eslint-disable-next-line
  }, [user]);

  const handleSubmit = async () => {
    const isFieldValid = (field) => {
      return Boolean(field.trim());
    };
    if (
      !isFieldValid(userInfo.first_name) ||
      !isFieldValid(userInfo.last_name) ||
      !isFieldValid(userInfo.email)
    ) {
      setSubmitError("Please fill the required fields.");
      return;
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/${id}`,
        userInfo,
        {
          withCredentials: true,
        }
      );

      navigate("/dashboard/users");
    } catch (error) {
      console.error(error);
      setSubmitError("Something went wrong, try again.");
    }
  };

  if (isNotLoggedIn) return <NotLoggedIn />;
  if (isLoading) return <Loading />;
  if (!userInfo) {
    return (
      <Alert severity="error">
        <Typography variant="h5">{fetchError}</Typography>
      </Alert>
    );
  }

  return (
    <Box component="section" sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        <Link underline="hover" color="inherit" href="/dashboard/users">
          User
        </Link>
        <Typography color="text.primary">
          {initialValues.first_name} {initialValues.last_name}
        </Typography>
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
        <Typography variant="h5">User Detail</Typography>

        <Stack spacing={3}>
          <Stack
            className="stack"
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="space-between"
          >
            <TextField
              required
              fullWidth
              id="first_name"
              name="first_name"
              label="First Name"
              variant="outlined"
              value={userInfo.first_name}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              id="last_name"
              name="last_name"
              label="Last Name"
              variant="outlined"
              value={userInfo.last_name}
              onChange={handleChange}
            />
          </Stack>

          <TextField
            required
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            placeholder="Enter your email"
            value={userInfo.email}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              required
              labelId="role-label"
              id="role_id"
              name="role_id"
              value={userInfo.role_id}
              label="Role"
              onChange={handleChange}
              disabled={user.role_id === 4}
            >
              <MenuItem value={1}>Agent</MenuItem>
              <MenuItem value={2}>Manager</MenuItem>
              <MenuItem value={3}>Team Lead</MenuItem>
              <MenuItem value={4}>Customer</MenuItem>
            </Select>
          </FormControl>

          {userInfo.user_id !== user.user_id && userInfo.role_id !== 4 && (
            <FormControl fullWidth>
              <InputLabel id="manager-label">Manager</InputLabel>
              <Select
                labelId="manager-label"
                id="manager_user_id"
                name="manager_user_id"
                value={userInfo.manager_user_id || -1}
                label="Manager"
                onChange={handleChange}
              >
                <MenuItem value={-1}>Not Assigned</MenuItem>
                {managers.map((user) => {
                  return (
                    <MenuItem key={user.user_id} value={user.user_id}>
                      {user.user_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}
          {submitError && <Alert severity="error">{submitError}</Alert>}
          <Stack
            className="stack"
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="space-between"
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setSubmitError(null);
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setUserInfo(initialValues);
                  setSubmitError(null);
                }}
              >
                Reset
              </Button>
            </Stack>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              startIcon={<EditNoteTwoToneIcon />}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

export default UserDetail;
