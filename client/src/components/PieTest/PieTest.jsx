import React, { useRef } from "react";
import { Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PieTest({ data }) {
  const formattedData = data.map((elem) => {
    if (elem.name === "High" || elem.name === "Escalated") {
      return {
        label: elem.name,
        value: elem.tickets,
        percentage: elem.percentage,
        color: "#d32f2f",
      };
    }
    return {
      label: elem.name,
      value: elem.tickets,
      percentage: elem.percentage,
    };
  });

  const boxRef = useRef(null);

  return (
    <Box
      ref={boxRef}
      sx={{
        width: "100%",
        height: 300,
        maxWidth: "500px",
        display: "flex",
        justifyContent: "center",
        // alignItems: "stretch",
      }}
    >
      <PieChart
        series={[
          {
            innerRadius: 40,
            outerRadius: 100,
            cornerRadius: 5,
            paddingAngle: 3,
            data: formattedData,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter: (e) => `${e.percentage}%`,
          },
        ]}
        width={400}
        height={300}
        // slotProps={{legend: { hidden: true },}}
      />
    </Box>
  );
}
