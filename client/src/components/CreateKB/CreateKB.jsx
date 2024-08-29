import "react-quill/dist/quill.snow.css"; // Import Quill's styles
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";

function CreateKB() {
  const navigate = useNavigate();

  const initialValues =
    '<h1 class="ql-align-center"><span class="ql-font-serif">This is a H1</span></h1><p class="ql-align-center"><a href="google.com" rel="noopener noreferrer" target="_blank" class="ql-font-monospace">link</a></p>';
  const [editorContent, setEditorContent] = useState(initialValues);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const handleEditorChange = (value) => {
    setEditorContent(value);
  };

  const handleSubmit = async () => {
    // try {
    //   const response = await fetch("/api/save-content", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ content: editorContent }),
    //   });
    console.log(editorContent);

    //   if (response.ok) {
    //     console.log("Content saved successfully!");
    //   } else {
    //     console.error("Failed to save content.");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <div>
      <TextField
        fullWidth
        name="title"
        id="title"
        label="Title"
        variant="outlined"
        placeholder="Article title for easy access"
        required
      />
      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline", "strike"],
            ["link"],
            [{ align: [] }],
            ["clean"],
          ],
        }}
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
              onClick={() => setEditorContent(initialValues)}
            >
              Reset
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </>
        )}
      </Stack>
    </div>
  );
}

export default CreateKB;
