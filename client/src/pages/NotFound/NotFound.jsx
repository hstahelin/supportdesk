import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mb: 4,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: "error.main" }} />
        <Typography variant="h1" sx={{ fontSize: 80, fontWeight: "bold" }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, mb: 4, color: "text.secondary" }}>
          Oops! The page you’re looking for doesn’t exist.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleGoHome}
        sx={{ px: 5, py: 1.5, textTransform: "none" }}
      >
        Go to Homepage
      </Button>
    </Container>
  );
}

export default NotFound;
