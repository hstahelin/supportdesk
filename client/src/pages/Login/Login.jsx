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
import "./Login.scss";

function Login() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [isFormValid, setIsFormValid] = useState({
    email: true,
    password: true,
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (!formValues.email || !formValues.password) {
      setIsFormValid({
        email: formValues.email,
        password: formValues.password,
      });
      return;
    }
    alert(`email: ${formValues.email}, password: ${formValues.password}`);
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
          <Button variant="contained" size="large" onClick={handleSubmit}>
            Login
          </Button>
          <Divider />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => alert("Go to SignUp")}
          >
            New user? Sign up
          </Button>
          <Button
            color="secondary"
            onClick={() => alert("Go to password reset")}
          >
            Forgot your password?
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
