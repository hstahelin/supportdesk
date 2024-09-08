import React, { useMemo, useContext } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { ColorModeContext } from "../contexts/ColorModeContext";

export const ThemeProvider = ({ children }) => {
  const { mode } = useContext(ColorModeContext);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
