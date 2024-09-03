import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Chip, Typography, Breadcrumbs, Link, Paper } from "@mui/material";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { formatDate } from "../../utils/utils";

import "./MyTickets.scss";

function MyTickets({ user }) {
  const navigate = useNavigate();

  const userJson = sessionStorage.getItem("user");
  if (userJson) {
    user = JSON.parse(userJson);
  } else {
    console.error("No user found.");
  }
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
        <GridActionsCellItem
          icon={<InfoOutlinedIcon />}
          label="Info"
          onClick={() => ticketDetails(params.id)}
        />,
        <GridActionsCellItem
          icon={<EditNoteTwoToneIcon />}
          label="Edit"
          onClick={() => ticketEdit(params.id)}
        />,
      ],
    },
    // {
    //   field: "id",
    //   headerName: "ID",
    //   flex: 0.8,
    //   headerClassName: "grid--header",
    //   renderCell: (params) => {
    //     const id = params.value;

    //     return (
    //       <>
    //         <IconButton
    //           color="primary"
    //           aria-label="Ticket details"
    //           size="small"
    //           onClick={() => ticketDetails(id)}
    //         >
    //           <InfoOutlinedIcon />
    //         </IconButton>

    //         <IconButton
    //           color="primary"
    //           aria-label="Ticket details"
    //           size="small"
    //           onClick={() => ticketDetails(id)}
    //         >
    //           <EditNoteTwoToneIcon />
    //         </IconButton>
    //         {id}
    //       </>
    //     );
    //   },
    // },
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

  return (
    <Box component="section" sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>

        <Typography color="text.primary">Tickets</Typography>
      </Breadcrumbs>
      <Paper elevation={4} className="paper" square={false}>
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
      </Paper>
    </Box>
  );
}

export default MyTickets;
