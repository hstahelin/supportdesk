import "react-quill/dist/quill.snow.css";
import axios from "axios";
import ReactQuill from "react-quill";
import {
  Button,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  Alert,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isRoleAuthorized } from "../../utils/utils";

import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";
import Loading from "../Loading/Loading";
import NoData from "../NoData/NoData";

function ViewKB() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(false);

  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    title: "",
    solution: "",
    is_public: true,
  });
  const [title, setTitle] = useState(initialValues.title);
  const [editorContent, setEditorContent] = useState(initialValues.solution);
  const [isPublic, setIsPublic] = useState(true);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [submitError, setSubmitError] = useState(null);
  const [updateConfirmation, setUpdateConfirmation] = useState(false);

  useEffect(() => {
    const userJson = sessionStorage.getItem("user");
    if (userJson) {
      setUser(JSON.parse(userJson));
    } else {
      setIsNotLoggedIn(true);
      setIsLoading(false);
    }
  }, []);

  const handleClickOpen = () => {
    setSubmitError(null);
    setUpdateConfirmation(true);
  };

  const handleClose = () => {
    setUpdateConfirmation(false);
    navigate("/dashboard/kb");
  };

  async function fetchKB(kbId) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/kb/${kbId}`,
        {
          withCredentials: true,
        }
      );
      setInitialValues(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchKB(id);
  }, [id, user]);

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setEditorContent(initialValues.solution);
      setIsPublic(initialValues.is_public);
    }
  }, [initialValues]);

  const handleChange = (event) => {
    setIsPublic(event.target.checked);
  };

  const handleEditorChange = (value) => {
    setEditorContent(value);
  };

  const handleSubmit = async () => {
    const isFieldValid = (field) => {
      return Boolean(field.trim());
    };
    if (!isFieldValid(title) || !isFieldValid(editorContent)) {
      setSubmitError("Please fill the Title and Content.");
      return;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/kb/${id}`,
        {
          title,
          solution: editorContent,
          is_public: isPublic,
        },
        { withCredentials: true }
      );
      handleClickOpen();
    } catch (error) {
      console.error(error);
      setSubmitError("Something went wrong, try again.");
    }
  };

  const TOOLBAR_OPTIONS = [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    ["link"],
    [{ align: [] }],
    ["clean"],
  ];

  if (isNotLoggedIn) return <NotLoggedIn />;
  if (isLoading) return <Loading />;
  if (!isPublic && user.role_id === 4)
    return <NoData errorMessage="You don't have access to this KB" />;

  return (
    <Box component="section" sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        <Link underline="hover" color="inherit" href="/dashboard/kb">
          Knowledge Base
        </Link>
        <Typography color="text.primary">{id}</Typography>
      </Breadcrumbs>

      <Paper
        elevation={4}
        square={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
          marginTop: 2,
        }}
      >
        {submitError && <Alert severity="error">{submitError}</Alert>}
        {isReadOnly ? (
          <Typography variant="h4" p={2}>
            {title}
          </Typography>
        ) : (
          <TextField
            fullWidth
            name="title"
            id="title"
            label="Title"
            variant="outlined"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        )}
        <ReactQuill
          value={editorContent}
          onChange={handleEditorChange}
          modules={{ toolbar: TOOLBAR_OPTIONS }}
          formats={[
            "header",
            "font",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "bullet",
            "link",
            "align",
          ]}
          placeholder="Write something amazing..."
          readOnly={isReadOnly}
        />
        <Stack
          spacing={2}
          padding={1}
          direction={{ xs: "column-reverse", sm: "row" }}
          justifyContent="flex-end"
          alignItems="stretch"
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isPublic}
                  onChange={handleChange}
                  disabled={isReadOnly}
                />
              }
              label="Public?"
              labelPlacement="start"
            />
          </FormGroup>
          {isReadOnly ? (
            isRoleAuthorized(user.role_id, [
              "Agent",
              "Manager",
              "Team Lead",
            ]) && (
              <Button variant="contained" onClick={() => setIsReadOnly(false)}>
                Edit
              </Button>
            )
          ) : (
            <>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setEditorContent(initialValues.solution);
                  setTitle(initialValues.title);
                  setIsReadOnly(true);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setEditorContent(initialValues.solution);
                  setTitle(initialValues.title);
                }}
              >
                Reset
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Save
              </Button>
            </>
          )}
        </Stack>
      </Paper>
      <Dialog
        open={updateConfirmation}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <PlaylistAddCheckIcon fontSize="large" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            KnowledgeBase article was successfully updated.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ViewKB;
