import { TextField, Box, Button, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { useState } from "react";
import { scrollToTop } from "../../utils/utils";

function NewComment({ addComment }) {
  const [comment, setComment] = useState("");
  const [isCommentValid, setIsCommentValid] = useState(true);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="flex-end"
      marginTop={1}
    >
      <Grid item xs={12} sm={12} md={8} lg={10}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          {/* <AccountCircleTwoToneIcon sx={{ color: "action.active", mr: 1, my: 1.5 }}/> */}
          <TextField
            fullWidth
            multiline
            rows={6}
            id="comment"
            name="comment"
            label="Add Comment"
            variant="outlined"
            value={comment}
            onChange={handleChange}
            error={!isCommentValid}
            helperText={!isCommentValid ? "Please enter a comment." : ""}
          />
        </Box>
      </Grid>
      <Grid
        item
        md={4}
        lg={2}
        container
        justifyContent="center"
        // alignItems="baseline"
      >
        <Button
          size="large"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => {
            if (!comment) {
              setIsCommentValid(false);
              return;
            }
            setIsCommentValid(true);
            addComment(comment);
            setComment("");
            scrollToTop();
          }}
        >
          Post
        </Button>
      </Grid>
    </Grid>
  );
}

export default NewComment;
