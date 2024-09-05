import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Collapse,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import ConfirmationNumberTwoToneIcon from "@mui/icons-material/ConfirmationNumberTwoTone";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";
import ImportContactsTwoToneIcon from "@mui/icons-material/ImportContactsTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import SupportDeskIcon from "../../assets/icons/supportdesk.icon.svg";

import UserMenu from "../UserMenu/UserMenu";
import "./Sidebar.scss";
import axios from "axios";
import { isRoleAuthorized } from "../../utils/utils";

const drawerWidth = 235;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Sidebar({ Content, ticketsFilter }) {
  const navigate = useNavigate();
  let user = null;
  const userJson = sessionStorage.getItem("user");
  if (userJson) {
    user = JSON.parse(userJson);
  } else {
    console.error("No user found.");
  }
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    setOpenTickets(false);
  };
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenTickets(false);
  };

  const [openTickets, setOpenTickets] = useState(false);

  const handleClickTickets = () => {
    handleDrawerOpen();
    setOpenTickets(!openTickets);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/auth/logout",
        {},
        { withCredentials: true }
      );
      sessionStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} noWrap>
            {user.first_name} {user.last_name} Dashboard
          </Typography>
          <UserMenu />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img src={SupportDeskIcon} alt="" className="sidebar-logo" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block", color: "primary.dark" }}
            component={Link}
            to="/dashboard"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <Tooltip title="Home">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <HomeTwoToneIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          {/* TICKETS */}
          <ListItem
            disablePadding
            sx={{ display: "block", color: "primary.dark" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={handleClickTickets}
            >
              <Tooltip title="Tickets">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ConfirmationNumberTwoToneIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Tickets" sx={{ opacity: open ? 1 : 0 }} />
              {open && (openTickets ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
          {/* NEW */}
          <Collapse in={openTickets} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <ListItem
                disablePadding
                sx={{ display: "block", color: "primary.dark", pl: 4 }}
                component={Link}
                to="/dashboard/tickets"
              > */}
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 10,
                }}
                selected={selectedIndex === 5}
                onClick={(event) => handleListItemClick(event, 5)}
                component={Link}
                to="/dashboard/tickets"
              >
                {/* <Tooltip title="All Tickets">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <ConfirmationNumberTwoToneIcon />
                  </ListItemIcon>
                </Tooltip> */}
                <ListItemText
                  primary="All Tickets"
                  sx={{ opacity: open ? 1 : 0, color: "primary.dark" }}
                />
              </ListItemButton>
              {isRoleAuthorized(user.role_id, [
                "Agent",
                "Manager",
                "Team Lead",
              ]) && (
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 10,
                  }}
                  selected={selectedIndex === 7}
                  onClick={(event) => handleListItemClick(event, 7)}
                  component={Link}
                  to="/dashboard/unassignedtickets"
                >
                  <ListItemText
                    primary="Unassigned Tickets"
                    sx={{ opacity: open ? 1 : 0, color: "primary.dark" }}
                  />
                </ListItemButton>
              )}

              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 10,
                }}
                selected={selectedIndex === 6}
                onClick={(event) => handleListItemClick(event, 6)}
                component={Link}
                to="/dashboard/createticket"
              >
                {/* <Tooltip title="All Tickets">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <ConfirmationNumberTwoToneIcon />
                  </ListItemIcon>
                </Tooltip> */}
                <ListItemText
                  primary="Create Ticket"
                  sx={{ opacity: open ? 1 : 0, color: "primary.dark" }}
                />
              </ListItemButton>

              {/* </ListItem> */}
            </List>
            <Divider />
          </Collapse>
          {/* NEW */}
          {/* TICKETS */}
          {isRoleAuthorized(user.role_id, [
            "Agent",
            "Manager",
            "Team Lead",
          ]) && (
            <ListItem
              disablePadding
              sx={{ display: "block", color: "primary.dark" }}
              component={Link}
              to="/dashboard/users"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <Tooltip title="Users / Roles">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PersonOutlineTwoToneIcon />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary="Users / Roles"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          )}

          <ListItem
            disablePadding
            sx={{ display: "block", color: "primary.dark" }}
            component={Link}
            to="/dashboard/notifications"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <Tooltip title="Notifications">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <NotificationsNoneTwoToneIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Notifications"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block", color: "primary.dark" }}
            component={Link}
            to="/dashboard/kb"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <Tooltip title="Knowledge Base">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ImportContactsTwoToneIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Knowledge Base"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block", color: "error.light" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={handleLogout}
            >
              <Tooltip title="Logout">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LogoutTwoToneIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Content ticketsFilter={ticketsFilter} />
      </Box>
    </Box>
  );
}

export default Sidebar;
