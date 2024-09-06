import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  Stack,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import SupportDeskIcon from "../../assets/icons/supportdesk.icon.png";
import { useState } from "react";
import axios from "axios";
import "./Signup.scss";

function Signup() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    fname: "",
    lname: "",
    password: "",
    verifyPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [isFormValid, setIsFormValid] = useState({
    fname: true,
    lname: true,
    email: true,
    password: true,
    verifyPassword: true,
  });
  const [registerError, setRegisterError] = useState(null);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (
      !formValues.email ||
      !formValues.password ||
      !formValues.verifyPassword ||
      !formValues.fname ||
      !formValues.lname
    ) {
      setIsFormValid({
        email: formValues.email,
        password: formValues.password,
        verifyPassword: formValues.verifyPassword,
        fname: formValues.fname,
        lname: formValues.lname,
      });
      return;
    }
    if (formValues.password !== formValues.verifyPassword) {
      setIsFormValid({ ...isFormValid, verifyPassword: false });
      return;
    }
    if (formValues.password.length < 8) {
      setIsFormValid({ ...isFormValid, verifyPassword: false });
      setRegisterError("Password must be at least 8 characters.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/auth/register", {
        first_name: formValues.fname,
        last_name: formValues.lname,
        email: formValues.email,
        password: formValues.password,
      });
      navigate("/");
    } catch (error) {
      setRegisterError(error.response.data.message);
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
          <Stack
            className="stack"
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="space-between"
          >
            <TextField
              id="fname"
              name="fname"
              label="First Name"
              variant="outlined"
              placeholder="Enter your first name"
              value={formValues.fname}
              onChange={handleChange}
              error={!isFormValid.fname}
              helperText={
                !isFormValid.fname ? "First Name can not be blank." : ""
              }
            />
            <TextField
              id="lname"
              name="lname"
              label="Last Name"
              variant="outlined"
              placeholder="Enter your last name"
              value={formValues.lname}
              onChange={handleChange}
              error={!isFormValid.lname}
              helperText={
                !isFormValid.lname ? "Last Name can not be blank." : ""
              }
            />
          </Stack>

          <TextField
            id="email"
            name="email"
            label="Email"
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
            label="Password"
            variant="outlined"
            type="password"
            placeholder="Enter your password"
            value={formValues.password}
            onChange={handleChange}
            error={!isFormValid.password}
            helperText={!isFormValid.password && "Password can not be blank."}
          />
          <TextField
            id="verifyPassword"
            name="verifyPassword"
            label="Re-enter password"
            variant="outlined"
            type="password"
            placeholder="Re-enter your password"
            value={formValues.verifyPassword}
            onChange={handleChange}
            error={!isFormValid.verifyPassword}
            helperText={!isFormValid.verifyPassword && "Passwords must match."}
          />
          {registerError && <Alert severity="error">{registerError}</Alert>}

          <Button variant="contained" size="large" onClick={handleSubmit}>
            Sign Up
          </Button>
          <Divider />
          <Stack
            className="stack"
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="caption">Already have an account?</Typography>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="secondary"
            >
              Sign in
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;
