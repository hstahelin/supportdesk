import { Grid, Paper, Stack, Box, Typography } from "@mui/material";
import "./KPI.scss";

function KPI({ label, unit, value, temperature, data }) {
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Paper elevation={4} className="kpi-container kpi-container__hover">

        <Stack
          direction="row"
          spacing={2}
          py={3}
          px={2}
          className={`kpi-box kpi-box__${data.temperature}`}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5">{label}</Typography>
          </Box>
          <Box>
            <Typography variant="h4">{data.value}</Typography>
            <Typography variant="h6">{data.unit}</Typography>
          </Box>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default KPI;
