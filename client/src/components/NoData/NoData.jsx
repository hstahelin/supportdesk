import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NoDataIcon from "@mui/icons-material/InboxOutlined"; // Replace with your preferred icon

function NotData() {
  const navigate = useNavigate();

  const handleCreateTicket = () => {
    navigate("/dashboard/createticket"); // Adjust the route to your ticket creation page
  };

  return (
    // <Container>
    <Box
      sx={{
        //   height: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "background.paper",
        // borderRadius: 3,
        //   p: 3,
        // boxShadow: 3,
      }}
    >
      <NoDataIcon sx={{ fontSize: 100, color: "primary.main", my: 2 }} />
      <Typography variant="h4" color="textPrimary" gutterBottom>
        No Data Available
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={4}>
        It seems like there are no tickets yet. You can create one now!
      </Typography>
      <Stack direction="row" spacing={2} paddingBottom={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateTicket}
          size="large"
          // sx={{ mb: 2 }}
        >
          Create a Ticket
        </Button>
      </Stack>
    </Box>
    // </Container>
  );
}

export default NotData;
