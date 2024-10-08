import axios from "axios";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Box,
  Chip,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  Button,
  Fab,
  Tooltip,
} from "@mui/material";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardDoubleArrowUpTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowUpTwoTone";
import PlaylistAddTwoToneIcon from "@mui/icons-material/PlaylistAddTwoTone";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { formatDate, scrollToTop } from "../../utils/utils";

import "./MyTickets.scss";
import NotData from "../NoData/NoData";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";
import Loading from "../Loading/Loading";

function MyTickets({ ticketsFilter }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [tickets, setTickets] = useState([]);
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
  }, [ticketsFilter]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [user, ticketsFilter]);

  const fetchData = async () => {
    try {
      const queryParams = queryString.parse(location.search);
      const queryStringParams = queryString.stringify(queryParams);

      const url = `${process.env.REACT_APP_API_BASE_URL}/tickets${
        queryStringParams ? `?${queryStringParams}` : ""
      }`;

      const response = await axios.get(url, {
        withCredentials: true,
      });

      let fetchedTickets = response.data;

      if (ticketsFilter === "unassigned") {
        fetchedTickets = fetchedTickets.filter(
          (ticket) => ticket.assign_user_id === null
        );
      }

      if (user.role_id === 1 && !ticketsFilter) {
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
    } finally {
      setIsLoading(false);
    }
  };

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});

  const updateColumnVisibility = () => {
    const isSmallScreen = window.matchMedia("(max-width: 600px)").matches;
    const isMediumScreen = window.matchMedia("(max-width: 900px)").matches;
    setColumnVisibilityModel({
      creationDate: !isSmallScreen && !isMediumScreen,
      createdBy: !isSmallScreen,
      fullName: !isSmallScreen && !isMediumScreen,
    });
  };

  useEffect(() => {
    updateColumnVisibility();

    const handleResize = () => updateColumnVisibility();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ticketDetails = (ticketId) => {
    navigate(`/dashboard/tickets/${ticketId}`);
  };

  const ticketEdit = (ticketId) => {
    navigate(`/dashboard/tickets/${ticketId}/edit`);
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      flex: 0.9,
      headerClassName: "grid--header",
      getActions: (params) => [
        <Tooltip title="Ticket Details">
          <GridActionsCellItem
            icon={<InfoOutlinedIcon />}
            label="Info"
            onClick={() => ticketDetails(params.id)}
          />
        </Tooltip>,
        <Tooltip title="Edit Ticket">
          <GridActionsCellItem
            icon={<EditNoteTwoToneIcon />}
            label="Edit"
            onClick={() => ticketEdit(params.id)}
          />
        </Tooltip>,
      ],
    },

    {
      field: "id",
      headerName: "ID",
      flex: 0.8,
      headerClassName: "grid--header",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1.2,
      headerClassName: "grid--header",
    },
    {
      field: "creationDate",
      headerName: "Creation Date",
      flex: 0.9,
      headerClassName: "grid--header",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      headerClassName: "grid--header",

      renderCell: (params) => {
        const status = params.value;
        let color = "default";
        let variant = "outlined";
        let disabled = false;

        if (status === "New") color = "primary";
        else if (status === "In Progress") color = "secondary";
        else if (status === "Escalated") {
          color = "error";
          variant = "default";
        } else if (status === "Solved") color = "success";
        else if (status === "Canceled") {
          color = "default";
          disabled = true;
          variant = "default";
        } else if (status === "Pending") {
          color = "warning";
          disabled = true;
        }

        return (
          <Chip
            label={status}
            color={color}
            variant={variant}
            disabled={disabled}
          />
        );
      },
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 0.8,
      headerClassName: "grid--header",

      renderCell: (params) => {
        const priority = params.value;
        let color = "default";
        let variant = "outlined";

        if (priority === "High") color = "error";
        else if (priority === "Medium") color = "warning";
        else if (priority === "Low") color = "success";

        return <Chip label={priority} color={color} variant={variant} />;
      },
    },
    {
      field: "createdBy",
      headerName: "Created By",
      flex: 1,
      headerClassName: "grid--header",
    },
    {
      field: "fullName",
      headerName: "Assigned to",
      description: "Assigned to",
      flex: 1,
      headerClassName: "grid--header",

      valueGetter: (value, row) =>
        `${row.assignedFirstName || ""} ${row.assignedLastName || ""}`,
    },
  ];
  const rows = tickets.map((ticket) => {
    return {
      id: ticket.ticket_id,
      title: ticket.title,
      creationDate: formatDate(ticket.created_at),
      status: ticket.status,
      priority: ticket.priority,
      createdBy: ticket.created_email,
      assignedFirstName: ticket.assign_first_name,
      assignedLastName: ticket.assign_last_name,
    };
  });

  if (isNotLoggedIn) return <NotLoggedIn />;
  if (isLoading) return <Loading />;

  return (
    <Box component="section" sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>

        <Typography color="text.primary">
          {ticketsFilter === "unassigned" ? "Unassigned " : "All "}Tickets
        </Typography>
      </Breadcrumbs>
      {tickets.length === 0 ? (
        <NotData />
      ) : (
        <Paper
          elevation={4}
          className="paper"
          square={false}
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
          }}
        >
          <Button
            startIcon={<PlaylistAddTwoToneIcon />}
            variant="contained"
            sx={{ width: "20%", marginLeft: "auto" }}
            onClick={() => navigate("/dashboard/createticket")}
          >
            Create Ticket
          </Button>
          <DataGrid
            rows={rows}
            columns={columns}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityChange={(newModel) =>
              setColumnVisibilityModel(newModel)
            }
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 25,
                },
              },
            }}
            pageSizeOptions={[10, 25, 50]}
          />
          <Tooltip title="Scroll Up">
            <Fab
              color="secondary"
              size="small"
              sx={{ marginLeft: "auto" }}
              onClick={() => scrollToTop()}
            >
              <KeyboardDoubleArrowUpTwoToneIcon />
            </Fab>
          </Tooltip>
        </Paper>
      )}
    </Box>
  );
}

export default MyTickets;
