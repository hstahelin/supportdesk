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
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";
import Loading from "../Loading/Loading";

function Overview() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(false);

  useEffect(() => {
    const userJson = sessionStorage.getItem("user");
    if (userJson) {
      const parsedUser = JSON.parse(userJson);
      setUser(parsedUser);
    } else {
      setIsNotLoggedIn(true);
      setIsLoading(false);
    }
  }, []);

  const [statusData, setStatusData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);

  const fetchDataWithErrorHandling = async (url, setData) => {
    try {
      const response = await axios(url, { withCredentials: true });
      setData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsNotLoggedIn(true);
      } else {
        console.error(error);
      }
    }
  };

  const fetchStatusData = () =>
    fetchDataWithErrorHandling(
      `${process.env.REACT_APP_API_BASE_URL}/tickets/status-summary`,
      setStatusData
    );

  const fetchPriorityData = () =>
    fetchDataWithErrorHandling(
      `${process.env.REACT_APP_API_BASE_URL}/tickets/priority-summary`,
      setPriorityData
    );

  const [tickets, setTickets] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/tickets`,
        {
          withCredentials: true,
        }
      );
      let fetchedTickets = response.data;
      if (user.role_id === 1) {
        fetchedTickets = fetchedTickets.filter(
          (ticket) => ticket.assign_user_id
        );
      }
      setTickets(fetchedTickets);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsNotLoggedIn(true);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      const fetchAllData = async () => {
        setIsLoading(true);
        await Promise.all([
          fetchData(),
          fetchStatusData(),
          fetchPriorityData(),
        ]);
        setIsLoading(false);
      };
      fetchAllData();
    }
    // eslint-disable-next-line
  }, [user]);

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
      const lastChangeDate = new Date(ticket.last_change_date || 0);
      const createdAt = new Date(ticket.created_at || 0);

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
      accumulator[ticket.assign_email] =
        (accumulator[ticket.assign_email] || 0) + 1;
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

  if (isNotLoggedIn) return <NotLoggedIn />;
  if (isLoading) return <Loading />;
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
