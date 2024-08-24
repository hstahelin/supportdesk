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

function TicketHistory() {
  return (
    <Card>
      <CardHeader title="History" className="card-header" />
      <CardContent>
        <List>
          <ListItem>
            <Box>
              <Typography variant="caption" display="block" gutterBottom>
                2024-Aug-23 10:10 AM
              </Typography>
              <Typography variant="body1">
                Changed ticket status from: <b>New</b> to: <b>In Progress</b>
              </Typography>
            </Box>
          </ListItem>
          <Divider />
          <ListItem>
            <Box>
              <Typography variant="caption" display="block" gutterBottom>
                2024-Aug-23 10:20 AM
              </Typography>
              <Typography variant="body1">
                Changed ticket status from: <b>In Progress</b> to:{" "}
                <b>Escalated</b>
              </Typography>
            </Box>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

export default TicketHistory;
