import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  Divider,
} from "@mui/material";

function Notifications() {
  return (
    <Box component="section" sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        <Typography color="text.primary">Notifications</Typography>
      </Breadcrumbs>

      <Paper elevation={4} square={false}>
        <Divider />
        <Typography variant="h5" p={2}>
          Notifications
        </Typography>
      </Paper>
    </Box>
  );
}

export default Notifications;
