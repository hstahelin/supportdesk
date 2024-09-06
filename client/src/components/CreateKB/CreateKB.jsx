import "react-quill/dist/quill.snow.css";
import {
  Alert,
  Button,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { Box, Typography, Breadcrumbs, Link, Paper } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import axios from "axios";

function CreateKB() {
  const navigate = useNavigate();

  const initialValues = { title: "", solution: "" };
  const [title, setTitle] = useState(initialValues.title);
  const [editorContent, setEditorContent] = useState(initialValues.solution);
  const [submitError, setSubmitError] = useState(null);
  const [createConfirmation, setCreateConfirmation] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

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
      await axios.post(
        "http://localhost:8080/kb",
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

  const handleClickOpen = () => {
    setSubmitError(null);
    setCreateConfirmation(true);
  };

  const handleClose = () => {
    setCreateConfirmation(false);
    navigate("/dashboard/kb");
  };

  return (
    <Box component="section" sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        <Link underline="hover" color="inherit" href="/dashboard/kb">
          Knowledge Base
        </Link>
        <Typography color="text.primary">Create</Typography>
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
          style={{ height: "300px" }}
        />
        <Stack
          paddingTop={{ xs: 8, md: 6 }}
          direction={{ xs: "column-reverse", sm: "row" }}
          justifyContent="flex-end"
          alignItems="stretch"
          gap={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={isPublic} onChange={handleChange} />}
              label="Public?"
              labelPlacement="start"
            />
          </FormGroup>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </Paper>
      <Dialog
        open={createConfirmation}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <PlaylistAddCheckIcon fontSize="large" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            KnowledgeBase article was successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CreateKB;
