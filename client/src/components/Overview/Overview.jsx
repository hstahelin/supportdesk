import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import "./Overview.scss";
import PieChart from "../PieChart/PieChart";

function Overview() {
  const [statusData, setStatusData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);

  const fetchStatusData = async () => {
    try {
      const response = await axios(
        "http://localhost:8080/tickets/status-summary"
      );
      setStatusData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPriorityData = async () => {
    try {
      const response = await axios(
        "http://localhost:8080/tickets/priority-summary"
      );
      setPriorityData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchStatusData();
    fetchPriorityData();
  }, []);

  return (
    <Box component="section" sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Dashboard
        </Link>
        <Typography color="text.primary">Tickets</Typography>
      </Breadcrumbs>

      <Paper elevation={4} square={false}>
        <Divider />
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="space-evenly"
          alignItems="stretch"
          padding={2}
        >
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Ticket Status Insights"
                className="card-header"
              />
              <CardContent className="card-content">
                <PieChart
                  colors={[
                    "#ff9800",
                    "#ef5350",
                    "#42a5f5",
                    "#ba68c8",
                    "#4caf50",
                  ]}
                  data={statusData}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardHeader title="X x X" className="card-header" />
              <CardContent className="card-content">
                <TicketStatusPie />
              </CardContent>
            </Card>
          </Grid> */}

          <Grid item xs md lg>
            <Card className="card-container">
              <CardHeader
                title="Ticket Priority Insights"
                className="card-header"
              />
              <CardContent className="card-content">
                <PieChart
                  colors={["#e53935", "#43a047", "#fb8c00"]}
                  data={priorityData}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Overview;
