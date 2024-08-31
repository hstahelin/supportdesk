import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
} from "@mui/material";
import axios from "axios";

function AIResponse({ input, openAI, setOpenAI, handleAddComment }) {
  // console.log("AIResponse: ", input);

  const [responseAI, setResponseAI] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleCloseAI = () => {
    setOpenAI(false);
  };

  async function fetchDataAI(text) {
    // console.log("fetchDataAI: ", text);

    try {
      const response = await axios.post("http://localhost:8080/ai", { text });
      setResponseAI(response.data.summary);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDataAI(input);
  }, [input]);

  const handleSaveCommentAI = () => {
    handleAddComment(responseAI, 1);
    handleCloseAI();
  };
  return (
    <React.Fragment>
      <Dialog
        open={openAI}
        onClose={handleCloseAI}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use AI generated response?"}
        </DialogTitle>
        <DialogContent>
          {isLoading ? (
            <DialogContentText id="alert-dialog-description">
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </DialogContentText>
          ) : (
            <DialogContentText id="alert-dialog-description">
              {responseAI}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCloseAI}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveCommentAI} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AIResponse;
