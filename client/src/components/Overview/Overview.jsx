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

import { PieChart as Pie } from "@mui/x-charts/PieChart";
import "./Overview.scss";
import PieChart from "../PieChart/PieChart";
import PieTest from "../PieTest/PieTest";
import KPI from "../KPI/KPI";

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

  const [tickets, setTickets] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(tickets[0].last_change_date);
    console.log(tickets[0].created_date);

    console.log(tickets[0].last_change_date - tickets[0].created_date);

    // tickets.reduce((prev, curr) =>)
  }, []);
  console.log(tickets[0]);

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
        {/* <Grid
          container
          spacing={3}
          direction="row"
          sx={{
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
          m={1}
        >
          <KPI label={"First Response Time (hours)"} />
          <KPI label={"Resolution Time (days)"} />
          <KPI label={"Backlog (tickets)"} />
          <KPI label={"First Day Resolution (tickets)"} />
        </Grid> */}
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="space-evenly"
          alignItems="stretch"
          padding={2}
        >
          <KPI label={"First Response Time (hours)"} value={"2.5"} />
          <KPI label={"Resolution Time (days)"} value={"0.72"} />
          <KPI label={"Backlog (tickets)"} value={"25"} />
          <KPI label={"First Day Resolution (tickets)"} value={"12"} />
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Ticket Status Insights"
                className="card-header"
              />
              <CardContent className="card-content">
                {/* <PieChart
                  colors={[
                    "#ff9800",
                    "#ef5350",
                    "#42a5f5",
                    "#ba68c8",
                    "#4caf50",
                  ]}
                  data={statusData}
                /> */}
                <PieTest data={statusData} />
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
                // title="PIE TEST"
                className="card-header"
              />
              <CardContent className="card-content" sx={{ height: "100" }}>
                {/* <PieChart
                  colors={["#e53935", "#43a047", "#fb8c00"]}
                  data={priorityData}
                /> */}

                <PieTest data={priorityData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Overview;
