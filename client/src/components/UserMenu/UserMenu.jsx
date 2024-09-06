import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ColorModeContext } from "../../contexts/ColorModeContext";

import {
  IconButton,
  MenuItem,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

function UserMenu() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const loggedUserId = storedUser?.user_id;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const [openLogout, setOpenLogout] = useState(false);

  const handleClickOpenLogout = () => {
    setOpenLogout(true);
  };

  const handleCloseLogout = () => {
    setOpenLogout(false);
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
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/dashboard/users/${loggedUserId}`);
          }}
          divider
        >
          User Details
        </MenuItem>
        <MenuItem onClick={colorMode.toggleColorMode} divider>
          {theme.palette.mode.charAt(0).toUpperCase() +
            theme.palette.mode.slice(1)}{" "}
          mode
          <IconButton color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </MenuItem>
        <MenuItem onClick={handleClickOpenLogout}>Logout</MenuItem>
      </Menu>

      <Dialog open={openLogout} onClose={handleCloseLogout}>
        <DialogTitle>
          <Typography variant="h5">
            Are you sure you want to log out?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textSecondary">
            You will need to log in again to access your dashboard.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              handleCloseLogout();
              handleClose();
            }}
          >
            Stay
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserMenu;
