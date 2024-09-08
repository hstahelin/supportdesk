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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";
import Loading from "../Loading/Loading";
import PostAddIcon from "@mui/icons-material/PostAdd";
import KeyboardDoubleArrowUpTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowUpTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import { scrollToTop } from "../../utils/utils";
import "./KB.scss";

function KB() {
  const [user, setUser] = useState(null);
  const [kbs, setKBs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(false);

  useEffect(() => {
    const userJson = sessionStorage.getItem("user");
    if (userJson) {
      setUser(JSON.parse(userJson));
      fetchKBData();
    } else {
      setIsNotLoggedIn(true);
      setIsLoading(false);
    }
  }, []);

  const fetchKBData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/kb`,
        {
          withCredentials: true,
        }
      );
      setKBs(response.data);
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

  if (isNotLoggedIn) return <NotLoggedIn />;
  if (isLoading) return <Loading />;

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
        {user.role_id !== 4 && (
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
        )}
        <TableContainer component={Paper} elevation={6}>
          <Table aria-label="Knowledge Base table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left" className="table--header">
                  ID
                </TableCell>
                <TableCell align="left" className="table--header">
                  Title
                </TableCell>
                <TableCell align="right" className="table--header">
                  Is Public?
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kbs.map((kb) => {
                if (!user || user.role_id !== 4 || kb.is_public) {
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
                      <TableCell align="right">
                        {kb.is_public ? (
                          <CheckCircleTwoToneIcon color="success" />
                        ) : (
                          <HighlightOffTwoToneIcon color="error" />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                }
                return null; // Explicit return for better readability
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
      </Paper>
    </Box>
  );
}

export default KB;
