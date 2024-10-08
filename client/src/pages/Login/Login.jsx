import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import SupportDeskIcon from "../../assets/icons/supportdesk.icon.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.scss";

function Login() {
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [isFormValid, setIsFormValid] = useState({
    email: true,
    password: true,
  });
  const [loginError, setLoginError] = useState();
  const [openForgot, setOpenForgot] = useState(false);

  const handleOpenForgetPassword = () => {
    setOpenForgot(true);
  };
  const handleCloseForgetPassword = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenForgot(false);
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (!formValues.email || !formValues.password) {
      setIsFormValid({
        email: formValues.email,
        password: formValues.password,
      });
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        {
          email: formValues.email,
          password: formValues.password,
        },
        { withCredentials: true }
      );

      const user = response.data.user;
      sessionStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
      setLoginError(error.response.data.message);
    }
  };

  const handleDemoLogin = async (email) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        {
          email: email,
          password: "password",
        },
        { withCredentials: true }
      );

      const user = response.data.user;
      sessionStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
      setLoginError(error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm" className="container">
      <Paper elevation={4} className="paper" square={false}>
        <Box className="box">
          <Stack
            className="stack"
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <img src={SupportDeskIcon} alt="" className="logo" />
            <Typography variant="h5" m={"auto"}>
              SupportDesk
            </Typography>
          </Stack>
          <TextField
            id="email"
            name="email"
            label="email"
            variant="outlined"
            placeholder="Enter your email"
            value={formValues.email}
            onChange={handleChange}
            error={!isFormValid.email}
            helperText={!isFormValid.email ? "Please enter a valid email." : ""}
          />
          <TextField
            id="password"
            name="password"
            label="password"
            variant="outlined"
            type="password"
            placeholder="Enter your password"
            value={formValues.password}
            onChange={handleChange}
            error={!isFormValid.password}
            helperText={!isFormValid.password && "Password can not be blank."}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit(e);
            }}
          />
          {loginError && <Alert severity="error">{loginError}</Alert>}
          <Button variant="contained" size="large" onClick={handleSubmit}>
            Login
          </Button>
          <Divider />
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            color="secondary"
          >
            New user? Sign up
          </Button>
          {loginError && (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleOpenForgetPassword}
            >
              Forgot your password?
            </Button>
          )}

          <Divider />

          <Paper
            elevation={10}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: 4,
              backgroundColor: "#f5f5f5",
            }}
          >
            <Typography variant="h6">Login as Demo User</Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent={"space-evenly"}
              gap={1}
            >
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleDemoLogin("robinnico@supportdesk.com")}
              >
                Manager
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleDemoLogin("janesmith@supportdesk.com")}
              >
                Team Lead
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleDemoLogin("frankclark@supportdesk.com")}
              >
                Support Agent
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleDemoLogin("ivy.moore@company.com")}
              >
                Customer
              </Button>
            </Box>
          </Paper>

          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={openForgot}
            autoHideDuration={3000}
            onClose={handleCloseForgetPassword}
            message="Coming soon."
          />
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
