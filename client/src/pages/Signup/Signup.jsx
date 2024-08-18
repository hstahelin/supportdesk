import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import SupportDeskIcon from "../../assets/icons/supportdesk.icon.svg";
import { useState } from "react";
import "./Signup.scss";

function Signup() {
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

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
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
    alert(
      `email: ${formValues.email}, password: ${formValues.password}, verifyPassword: ${formValues.verifyPassword}`
    );
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
          <Button variant="contained" size="large" onClick={handleSubmit}>
            Sign Up
          </Button>
          <Divider />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => alert("Go to SignUp")}
          >
            Already have an account? Sign in
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;
