import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  Button,
  Fab,
  Tooltip,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import KeyboardDoubleArrowUpTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowUpTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import { scrollToTop } from "../../utils/utils";
import "./KB.scss";

function KB() {
  let user = null;
  const userJson = sessionStorage.getItem("user");
  if (userJson) {
    user = JSON.parse(userJson);
  } else {
    console.error("No user found.");
  }
  const [kbs, setKBs] = useState([]);

  const fetchKBData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/kb", {
        withCredentials: true,
      });
      setKBs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchKBData();
  }, []);
  return (
    <Box component="section" sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        <Typography color="text.primary">Knowledge Base</Typography>
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
        <Typography variant="h5">Knowledge Base</Typography>
        <Button
          variant="contained"
          endIcon={<PostAddIcon />}
          href="/dashboard/kb/create"
          sx={{
            width: {
              sm: "100%",
              md: "25%",
            },
            marginLeft: "auto",
          }}
        >
          Create New KB
        </Button>
        <TableContainer component={Paper} elevation={6}>
          <Table aria-label="Users table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left" className="table--header">
                  ID
                </TableCell>
                <TableCell align="left" className="table--header">
                  Title
                </TableCell>
                <TableCell align="right" className="table--header">
                  is Public?
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kbs.map((kb) => {
                if (user.role_id !== 4 || kb.is_public) {
                  return (
                    <TableRow key={kb.kb_id}>
                      <TableCell align="left" component="th" scope="row">
                        {kb.kb_id}
                      </TableCell>
                      <TableCell align="left">
                        <Link
                          underline="hover"
                          href={`/dashboard/kb/${kb.kb_id}`}
                        >
                          {kb.title}
                        </Link>
                      </TableCell>
                      <TableCell align="right" component="th" scope="row">
                        {/* HighlightOffTwoToneIcon, CheckCircleTwoToneIcon */}
                        {kb.is_public ? (
                          <CheckCircleTwoToneIcon color="success" />
                        ) : (
                          <HighlightOffTwoToneIcon color="error" />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                }
                return;
              })}
            </TableBody>
          </Table>
        </TableContainer>
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
        {/* <Button
          variant="contained"
          endIcon={<PostAddIcon />}
          href="/dashboard/kb/create"
          sx={{
            width: {
              sm: "100%",
              md: "25%",
            },
            marginLeft: "auto",
          }}
        >
          Create New KB
        </Button> */}
      </Paper>
    </Box>
  );
}

export default KB;
