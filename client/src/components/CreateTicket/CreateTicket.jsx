import React from "react";

import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  Divider,
} from "@mui/material";
import "./CreateTicket.scss";

function CreateTicket() {
  return (
    <Box component="section" sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Dashboard
        </Link>
        <Typography color="text.primary">Create Ticket</Typography>
      </Breadcrumbs>

      <Paper elevation={4} square={false}>
        <Divider />
        <Typography>New Ticket</Typography>
      </Paper>
    </Box>
  );
}

export default CreateTicket;
