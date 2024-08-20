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
import SupportDeskIcon from "../../assets/icons/supportdesk.icon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.scss";

function Login({ setUser }) {
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
      const response = await axios.post("http://localhost:8080/auth/login", {
        email: formValues.email,
        password: formValues.password,
      });
      const user = response.data.user;
      sessionStorage.setItem("user", JSON.stringify(user));
      setUser(user);
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
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleOpenForgetPassword}
          >
            Forgot your password?
          </Button>
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
