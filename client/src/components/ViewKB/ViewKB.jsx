import "react-quill/dist/quill.snow.css";
import { Button, Stack, TextField } from "@mui/material";
import { Box, Typography, Breadcrumbs, Link, Paper } from "@mui/material";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";

function ViewKB() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    title: "",
    solution: "",
  });
  const [title, setTitle] = useState(initialValues.title);
  const [editorContent, setEditorContent] = useState(initialValues.solution);
  const [isReadOnly, setIsReadOnly] = useState(true);

  async function fetchKB(kbId) {
    try {
      const response = await axios.get(`http://localhost:8080/kb/${kbId}`);
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
    console.log("Title:", title);
    console.log("Editor Content:", editorContent);
    // Add API call or further processing here
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
            <Button variant="contained" onClick={() => setIsReadOnly(false)}>
              Edit
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="error"
                onClick={() => setIsReadOnly(true)}
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
    </Box>
  );
}

export default ViewKB;
