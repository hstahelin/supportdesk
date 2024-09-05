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

    // Convert the string to a Date object
    const date = new Date(ticket.created_at);

    // Extract the month (getMonth() returns 0-11, so add 1 to get 1-12)
    // const month = monthNames[date.getMonth()];
    const month = date.getMonth();

    // Extract the year
    const year = date.getFullYear();

    const label = `${year}-${monthNames[date.getMonth()]}`;

    return { label, month, year, status: ticket.status };
  });

  const transformedData = formattedData.reduce((accumulator, ticket) => {
    // Find if the combination of month and year already exists
    let existingEntry = accumulator.find(
      (item) => item.month === ticket.month && item.year === ticket.year
    );

    if (!existingEntry) {
      // Create a new entry for this month and year if it doesn't exist
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

    // Increment the count for the current status
    existingEntry[ticket.status.toLowerCase()]++;

    return accumulator;
  }, []);

  const sortedData = transformedData.sort((a, b) => {
    // First, compare by year
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    // If years are the same, compare by month
    return a.month - b.month;
  });

  const valueFormatter = (value) => `${value} tickets`;
  return (
    <Box
      sx={{
        // width: "100%",
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
        //   series={[
        //     { data: pData, label: "pv", id: "pvId" },
        //     { data: uData, label: "uv", id: "uvId" },
        //   ]}
        //   xAxis={[{ data: xLabels, scaleType: "band" }]}
      />
    </Box>
  );
}

export default BarChart;
