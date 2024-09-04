import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  Breadcrumbs,
  Paper,
  Grid,
  Divider,
} from "@mui/material";

import "./Overview.scss";
import PieTest from "../PieTest/PieTest";
import KPI from "../KPI/KPI";

function Overview() {
  const [statusData, setStatusData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);

  const fetchStatusData = async () => {
    try {
      const response = await axios(
        "http://localhost:8080/tickets/status-summary",
        { withCredentials: true }
      );
      setStatusData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPriorityData = async () => {
    try {
      const response = await axios(
        "http://localhost:8080/tickets/priority-summary",
        { withCredentials: true }
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
      const response = await axios.get("http://localhost:8080/tickets", {
        withCredentials: true,
      });
      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box component="section" sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">Dashboard</Typography>
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
          <KPI
            label={"First Response Time"}
            value={"2.5"}
            unit="hours"
            temperature="high"
          />
          <KPI
            label={"Resolution Time"}
            value={"0.72"}
            unit="days"
            temperature="normal"
          />
          <KPI
            label={"Backlog"}
            value={"25"}
            unit="tickets"
            temperature="warning"
          />
          <KPI
            label={"First Day Resolution"}
            value={"12"}
            unit="tickets"
            temperature="normal"
          />
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Ticket Status Insights"
                className="card-header"
              />
              <CardContent className="card-content">
                <PieTest data={statusData} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs md lg>
            <Card className="card-container">
              <CardHeader
                title="Ticket Priority Insights"
                className="card-header"
              />
              <CardContent className="card-content" sx={{ height: "100" }}>
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
