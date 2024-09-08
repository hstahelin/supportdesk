import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { formatDate } from "../../utils/utils";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Button,
  Alert,
} from "@mui/material";

import SmartToyTwoToneIcon from "@mui/icons-material/SmartToyTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import SupportAgentTwoToneIcon from "@mui/icons-material/SupportAgentTwoTone";
import AutoFixHighTwoToneIcon from "@mui/icons-material/AutoFixHighTwoTone";
import NewComment from "../NewComment/NewComment";
import Loading from "../Loading/Loading";

const AIResponse = lazy(() => import("../AIResponse/AIResponse"));

function TicketComments({
  ticketId,
  addComment,
  setRemountKey,
  input,
  ticketInfo,
}) {
  const [comments, setComments] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userJson = sessionStorage.getItem("user");
    if (userJson) {
      setUser(JSON.parse(userJson));
    } else {
      setIsLoading(false);
    }
  }, []);

  async function fetchComments() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/tickets/${ticketId}/comments`,
        { withCredentials: true }
      );

      setComments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [ticketId, trigger, user]);

  async function handleAddComment(comment, userId) {
    await addComment(comment, userId);
    setTrigger((prev) => !prev);
    setRemountKey((prev) => !prev);
  }

  const [openAI, setOpenAI] = useState(false);
  const handleClickOpenAI = () => {
    setOpenAI(true);
  };

  if (isLoading) return <Loading />;
  return (
    <Card>
      <CardHeader
        title={`Comments (${comments.length})`}
        className="card-header"
      />
      <CardContent>
        {comments.length === 0 &&
          user.role_id !== 4 &&
          ticketInfo.status !== "Solved" &&
          ticketInfo.status !== "Canceled" && (
            <React.Fragment>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                endIcon={<AutoFixHighTwoToneIcon />}
                onClick={handleClickOpenAI}
              >
                AI Response?
              </Button>
              <Suspense fallback={<div>Loading...</div>}>
                {openAI && (
                  <AIResponse
                    input={input}
                    openAI={openAI}
                    setOpenAI={setOpenAI}
                    handleAddComment={handleAddComment}
                  />
                )}
              </Suspense>
            </React.Fragment>
          )}
        <List>
          {comments.map((comment) => {
            return (
              <React.Fragment key={comment.comment_id}>
                <ListItem>
                  <ListItemIcon>
                    {comment.comments_by_role_name === "Customer" ? (
                      <AccountCircleTwoToneIcon fontSize="large" />
                    ) : comment.comments_by_role_name === "AI Assistant" ? (
                      <SmartToyTwoToneIcon fontSize="large" />
                    ) : (
                      <SupportAgentTwoToneIcon fontSize="large" />
                    )}
                  </ListItemIcon>
                  <Box>
                    <Typography variant="caption" display="block" gutterBottom>
                      by {comment.comments_by_name}
                    </Typography>
                    <Typography variant="body1">{comment.comments}</Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      {formatDate(comment.created_at)}
                    </Typography>
                  </Box>
                </ListItem>
                <Divider variant="inset" />
              </React.Fragment>
            );
          })}
        </List>
        {ticketInfo.status !== "Solved" && ticketInfo.status !== "Canceled" ? (
          <NewComment addComment={handleAddComment} />
        ) : (
          <Alert severity="info">
            No comments can be added as this ticket is marked as{" "}
            {ticketInfo.status}.
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default TicketComments;
