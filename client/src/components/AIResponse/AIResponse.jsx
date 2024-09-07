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
  const [responseAI, setResponseAI] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCloseAI = () => {
    setOpenAI(false);
  };

  async function fetchDataAI(text) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/ai`,
        { text },
        { withCredentials: true }
      );
      setResponseAI(response.data.summary);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch AI response.");
    } finally {
      setIsLoading(false);
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
          ) : error ? ( // Display error message if there was an error
            <DialogContentText id="alert-dialog-description" color="error">
              {error}
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
