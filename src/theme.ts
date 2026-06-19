import { createTheme } from "@mui/material";

export const neonTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#66fcf1" },
    error: { main: "#ff003c" },
    success: { main: "#00ff00" },
    background: {
      default: "#0b0c10",
      paper: "#1f2833",
    },
    text: { primary: "#c5c6c7" },
  },
  typography: {
    fontFamily: '"Courier New", Courier, monospace',
  },
});
