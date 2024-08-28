import { Card, CardContent, CardHeader, Grid, Paper } from "@mui/material";
import "./KPI.scss";

function KPI({ label, value }) {
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Paper elevation={6}>
        <Card>
          <CardHeader title={label} className="card-header--small" />
          <CardContent className="card-content">{value}</CardContent>
        </Card>
      </Paper>
    </Grid>
  );
}

export default KPI;
