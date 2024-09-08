import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NoDataIcon from "@mui/icons-material/InboxOutlined";

function NotData({ errorMessage }) {
  const navigate = useNavigate();

  const handleCreateTicket = () => {
    navigate("/dashboard/createticket");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "background.paper",
      }}
    >
      <NoDataIcon sx={{ fontSize: 100, color: "primary.main", my: 2 }} />
      <Typography variant="h4" color="textPrimary" gutterBottom>
        No Data Available
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={4}>
        {errorMessage ||
          "It seems like there are no tickets yet. You can create one now!"}
      </Typography>
      {!errorMessage ? (
        <Stack direction="row" spacing={2} paddingBottom={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTicket}
            size="large"
          >
            Create a Ticket
          </Button>
        </Stack>
      ) : (
        ""
      )}
    </Box>
  );
}

export default NotData;
