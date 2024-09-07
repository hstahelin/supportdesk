import React, { useEffect, useState } from "react";
import "./PieChart.scss";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

function PieChart({ colors, data }) {
  const theme = useTheme();

  const [pieStyles, setPieStyles] = useState("");

  useEffect(() => {
    if (data.length === 0) return;

    const stylesText = `radial-gradient(${theme.palette.background.default} 40%, transparent 0 70%), conic-gradient(from 30deg, `;
    const values = data.reduce((acc, curr, index) => {
      const percentage = parseFloat(curr.cumulative_percentage);
      if (!isNaN(percentage)) {
        return acc + `${colors[index]} 0 ${percentage.toFixed(0)}%, `;
      }
      return acc;
    }, "");

    setPieStyles(stylesText + values.slice(0, -2) + ")");
    // eslint-disable-next-line
  }, [data, theme]);

  return (
    <figure className="charts">
      <div
        className="pie"
        style={{
          backgroundImage: pieStyles,
        }}
      ></div>

      <figcaption className="legends">
        {data.map((elem, index) => {
          return (
            <span key={elem.name} className="legend-content">
              <span
                className="legend-color"
                style={{ backgroundColor: colors[index] }}
              ></span>
              <Typography variant="button">
                {elem.name}: {elem.tickets}
              </Typography>
            </span>
          );
        })}
      </figcaption>
    </figure>
  );
}

export default PieChart;
