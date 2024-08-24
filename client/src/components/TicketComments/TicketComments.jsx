import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import "./TicketComments.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "../../utils/utils";
import NewComment from "../NewComment/NewComment";

function TicketComments({ ticketId, addComment }) {
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
  }, [ticketId, trigger]);

  async function handleAddComment(comment) {
    await addComment(comment);
    setTrigger((prev) => !prev);
  }
  return (
    <Card>
      <CardHeader
        title={`Comments (${comments.length})`}
        className="card-header"
      />
      <CardContent>
        <List>
          {comments.map((comment) => {
            return (
              <ListItem key={comment.id}>
                <ListItemIcon>
                  <AccountCircleTwoToneIcon fontSize="large" />
                </ListItemIcon>
                <Box>
                  <Typography variant="caption" display="block" gutterBottom>
                    by {comment.comments_by}
                  </Typography>
                  <Typography variant="body1">{comment.comments}</Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {formatDate(comment.created_date)}
                  </Typography>
                </Box>
              </ListItem>
            );
          })}
          {/* <ListItem>
            <ListItemIcon>
              <AccountCircleTwoToneIcon fontSize="large" />
            </ListItemIcon>
            <Box>
              <Typography variant="caption" display="block" gutterBottom>
                by user name
              </Typography>
              <Typography variant="body1">Lorem ipsum dolor</Typography>
            </Box>
          </ListItem> */}
        </List>
        <Divider />
        <NewComment addComment={handleAddComment} />
      </CardContent>
    </Card>
  );
}

export default TicketComments;
