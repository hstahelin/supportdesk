import React from "react";

import {
  Card,
  CardHeader,
  List,
  ListItem,
  Box,
  Typography,
  CardContent,
  Divider,
} from "@mui/material";

import "./TicketHistory.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "../../utils/utils";

function TicketHistory({ ticketId, remountKey }) {
  const [timeline, setTimeline] = useState([]);
  async function fetchHistoryData(id) {
    try {
      const response = await axios.get(
        `http://localhost:8080/tickets/${id}/timeline`,
        { withCredentials: true }
      );
      setTimeline(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchHistoryData(ticketId);
  }, [ticketId, remountKey]);
  return (
    <Card>
      <CardHeader title="History" className="card-header" />
      <CardContent>
        <List>
          {timeline.map((entry) => (
            <React.Fragment
              key={`${entry.ticket_id}-${entry.name}-${entry.created_at}`}
            >
              <ListItem>
                <Box>
                  <Typography variant="caption" display="block" gutterBottom>
                    {formatDate(entry.created_at)}
                  </Typography>
                  <Typography variant="body1">
                    {entry.category === "COMMENT" ? (
                      <>
                        New <b>{entry.category}</b> by: <b>{entry.name}</b>.
                      </>
                    ) : (
                      <>
                        <b>{entry.category}</b> set to: <b>{entry.name}</b>.
                      </>
                    )}
                  </Typography>
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default TicketHistory;
