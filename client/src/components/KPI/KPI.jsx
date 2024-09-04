import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import "./KPI.scss";

function KPI({ label, unit, value, temperature }) {
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Paper elevation={8}>
        {/* <Card>
          <CardHeader title={label} className="card-header--small" />
          <CardContent className="card-content">{value}</CardContent>
        </Card> */}
        <Stack
          direction="row"
          spacing={2}
          py={3}
          px={2}
          className={`kpi-box kpi-box__${temperature}`}
          // sx={{ height: "90px" }}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5">{label}</Typography>
          </Box>
          <Box>
            <Typography variant="h4">{value}</Typography>
            <Typography variant="h6">{unit}</Typography>
          </Box>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default KPI;
