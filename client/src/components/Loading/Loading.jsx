import { Box, Paper, Skeleton, LinearProgress } from "@mui/material";

function Loading() {
  return (
    <Box component="section" sx={{ p: 2, width: "100%" }}>
      <Paper
        elevation={4}
        square={false}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginTop: 2,
        }}
      >
        <LinearProgress />
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Paper>
    </Box>
  );
}

export default Loading;
