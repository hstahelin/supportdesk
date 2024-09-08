import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function NotLoggedIn({ errorMessage }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={6}
        sx={{ p: 4, textAlign: "center", borderRadius: "12px" }}
      >
        <Box sx={{ mb: 2 }}>
          <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />
        </Box>
        <Typography variant="h4" gutterBottom color="textPrimary">
          Access Denied
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          {errorMessage || "You must be logged in to access this page."}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleRedirect}
          >
            Go to Login
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default NotLoggedIn;
