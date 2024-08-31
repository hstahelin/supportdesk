import React, { lazy, Suspense, useEffect, useState } from "react";

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
} from "@mui/material";
import SmartToyTwoToneIcon from "@mui/icons-material/SmartToyTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import SupportAgentTwoToneIcon from "@mui/icons-material/SupportAgentTwoTone";
import AutoFixHighTwoToneIcon from "@mui/icons-material/AutoFixHighTwoTone";
import "./TicketComments.scss";
import axios from "axios";
import { formatDate } from "../../utils/utils";
import NewComment from "../NewComment/NewComment";
const AIResponse = lazy(() => import("../AIResponse/AIResponse"));

function TicketComments({ ticketId, addComment, setRemountKey, input }) {
  const [comments, setComments] = useState([]);
  const [trigger, setTrigger] = useState(false);

  async function fetchComments() {
    try {
      const response = await axios.get(
        `http://localhost:8080/tickets/${ticketId}/comments`
      );

      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [ticketId, trigger]);

  async function handleAddComment(comment, userId) {
    await addComment(comment, userId);
    setTrigger((prev) => !prev);
    setRemountKey((prev) => !prev);
  }

  const [openAI, setOpenAI] = useState(false);
  const handleClickOpenAI = () => {
    setOpenAI(true);
  };
  return (
    <Card>
      <CardHeader
        title={`Comments (${comments.length})`}
        className="card-header"
      />
      <CardContent>
        {comments.length === 0 && (
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
        <NewComment addComment={handleAddComment} />
      </CardContent>
    </Card>
  );
}

export default TicketComments;
