import "react-quill/dist/quill.snow.css";
import { Button, Stack, TextField } from "@mui/material";
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
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import ReactQuill from "react-quill";
import { isRoleAuthorized } from "../../utils/utils";

function ViewKB() {
  let user = null;
  const userJson = sessionStorage.getItem("user");
  if (userJson) {
    user = JSON.parse(userJson);
  } else {
    console.error("No user found.");
  }
  const navigate = useNavigate();

  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    title: "",
    solution: "",
  });
  const [title, setTitle] = useState(initialValues.title);
  const [editorContent, setEditorContent] = useState(initialValues.solution);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [submitError, setSubmitError] = useState(null);
  const [updateConfirmation, setUpdateConfirmation] = useState(false);

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
      const response = await axios.get(`http://localhost:8080/kb/${kbId}`, {
        withCredentials: true,
      });
      setInitialValues(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchKB(id);
  }, [id]);

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setEditorContent(initialValues.solution);
    }
  }, [initialValues]);

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
        `http://localhost:8080/kb/${id}`,
        {
          title,
          solution: editorContent,
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
