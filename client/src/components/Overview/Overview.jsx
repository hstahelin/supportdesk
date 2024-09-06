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
} from "@mui/material";

import "./Overview.scss";
import PieTest from "../PieTest/PieTest";
import KPI from "../KPI/KPI";
import Barchart from "../BarChart/BarChart";
import NotData from "../NoData/NoData";

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

  function unassignedTickets(data) {
    const total = data.length;
    const unassigned = data.filter((element) => !element.assign_user_id).length;
    const temperature = unassigned / total;

    return {
      value: unassigned,
      unit: "tickets",
      temperature:
        temperature >= 0.6 ? "high" : temperature >= 0.4 ? "warning" : "normal",
    };
  }

  function backlog(data) {
    const open = data.filter(
      (element) => element.status !== "Solved" && element.status !== "Canceled"
    ).length;
    const temperature = open;

    return {
      value: open,
      unit: "tickets",
      temperature:
        temperature >= 6 ? "high" : temperature >= 4 ? "warning" : "normal",
    };
  }

  function resolutionTime(data) {
    // const total = data.length;

    const closed = data.filter((element) => element.status === "Solved");
    if (closed.length === 0) {
      return {
        value: "No Data",
        unit: "",
        temperature: "nodata",
      };
    }

    let resTime = closed.reduce((acc, ticket) => {
      const lastChangeDate = new Date(ticket.last_change_date);
      const createdAt = new Date(ticket.created_at);

      return acc + (lastChangeDate - createdAt);
    }, 0);

    resTime = resTime / (1000 * 60 * 60 * 24) / closed.length;

    return {
      value: resTime.toFixed(1),
      unit: "days/ticket",
      temperature:
        resTime >= 1 ? "high" : resTime >= 0.5 ? "warning" : "normal",
    };
  }

  function agentUtilization(data) {
    const assigned = data.filter((element) => element.assign_user_id);
    if (assigned.length === 0) {
      return {
        value: "No Data",
        unit: "",
        temperature: "nodata",
      };
    }
    const agentCounts = assigned.reduce((accumulator, ticket) => {
      if (accumulator[ticket.assign_email]) {
        accumulator[ticket.assign_email]++;
      } else {
        accumulator[ticket.assign_email] = 1;
      }
      return accumulator;
    }, {});

    const totalTickets = assigned.length;
    const totalAgents = Object.keys(agentCounts).length;
    const averageTicketsPerAgent = totalTickets / totalAgents;

    return {
      value: averageTicketsPerAgent.toFixed(1),
      unit: "tickets/agent",
      temperature:
        averageTicketsPerAgent >= 8
          ? "high"
          : averageTicketsPerAgent >= 5
          ? "warning"
          : "normal",
    };
  }

  return (
    <Box component="section" sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">Dashboard</Typography>
      </Breadcrumbs>

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
        {tickets.length === 0 ? (
          <NotData />
        ) : (
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="space-evenly"
            alignItems="stretch"
            padding={2}
          >
            <KPI label={"Resolution Time"} data={resolutionTime(tickets)} />
            <KPI label={"Agent Utilization"} data={agentUtilization(tickets)} />
            <KPI label={"Backlog"} data={backlog(tickets)} />
            <KPI label={"Unanswered"} data={unassignedTickets(tickets)} />
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title="Ticket Status Insights"
                  className="card-header"
                />
                <CardContent className="card-content">
                  <PieTest data={statusData} category="status" />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card className="card-container">
                <CardHeader
                  title="Ticket Priority Insights"
                  className="card-header"
                />
                <CardContent className="card-content">
                  <PieTest data={priorityData} category="priority" />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className="card-container">
                <CardHeader title="Tickets by Month" className="card-header" />
                <CardContent className="card-content">
                  <Barchart data={tickets} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  );
}

export default Overview;
