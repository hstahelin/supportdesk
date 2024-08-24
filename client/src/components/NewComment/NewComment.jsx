import { TextField, Box, Button, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { useState } from "react";
import { scrollToTop } from "../../utils/utils";

function NewComment({ addComment }) {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      marginTop={1}
    >
      <Grid item xs={8} lg={10}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircleTwoToneIcon
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
          />
          <TextField
            fullWidth
            id="comment"
            name="comment"
            label="Add Comment"
            variant="standard"
            value={comment}
            onChange={handleChange}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={4}
        lg={2}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => {
            addComment(comment);
            setComment("");
            scrollToTop();
          }}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
}

export default NewComment;
