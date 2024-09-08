import { BarChart as BarChartMUI } from "@mui/x-charts/BarChart";
import { Box } from "@mui/material";

function BarChart({ data }) {
  const formattedData = data.map((ticket) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(ticket.created_at);

    const month = date.getMonth();

    const year = date.getFullYear();

    const label = `${year}-${monthNames[date.getMonth()]}`;

    return { label, month, year, status: ticket.status };
  });

  const transformedData = formattedData.reduce((accumulator, ticket) => {
    let existingEntry = accumulator.find(
      (item) => item.month === ticket.month && item.year === ticket.year
    );

    if (!existingEntry) {
      existingEntry = {
        label: ticket.label,
        month: ticket.month,
        year: ticket.year,
        new: 0,
        inProgress: 0,
        pending: 0,
        escalated: 0,
        solved: 0,
        canceled: 0,
      };
      accumulator.push(existingEntry);
    }

    existingEntry[ticket.status.toLowerCase()]++;

    return accumulator;
  }, []);

  const sortedData = transformedData.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    return a.month - b.month;
  });

  const valueFormatter = (value) => `${value} tickets`;
  return (
    <Box
      sx={{
        height: 300,
        maxWidth: "700px",
        m: "auto",
      }}
    >
      <BarChartMUI
        barLabel="value"
        borderRadius={25}
        dataset={sortedData}
        xAxis={[{ scaleType: "band", dataKey: "label" }]}
        width={700}
        height={300}
        series={[
          { dataKey: "new", label: "New", valueFormatter },
          { dataKey: "inProgress", label: "In Progress", valueFormatter },
          { dataKey: "pending", label: "Pending", valueFormatter },
          { dataKey: "escalated", label: "Escalated", valueFormatter },
          { dataKey: "solved", label: "Solved", valueFormatter },
          { dataKey: "canceled", label: "Canceled", valueFormatter },
        ]}
      />
    </Box>
  );
}

export default BarChart;
