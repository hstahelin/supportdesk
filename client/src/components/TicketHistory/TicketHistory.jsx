import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils/utils";

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
import Loading from "../Loading/Loading";
import "./TicketHistory.scss";

function TicketHistory({ ticketId, remountKey }) {
  const [timeline, setTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchHistoryData(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/tickets/${id}/timeline`,
        { withCredentials: true }
      );
      setTimeline(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchHistoryData(ticketId);
  }, [ticketId, remountKey]);

  if (isLoading) return <Loading />;
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
