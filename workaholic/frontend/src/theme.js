// theme.js
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          400: "#2f3136",
        },
        gray: {
          100: "#f0f0f0",
          200: "#d9d9d9",
        },
        text: {
          primary: "#ffffff",
          secondary: "#b0b0b0",
        },
      }
    : {
        primary: {
          400: "#ffffff",
        },
        gray: {
          100: "#1e1e1e",
          200: "#333333",
        },
        text: {
          primary: "#1e1e1e",
          secondary: "#4f4f4f",
        },
      }),
});

const theme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            text: {
              primary: "#ffffff",
              secondary: "#b0b0b0",
            },
          }
        : {
            background: {
              default: "#f4f5f7",
              paper: "#ffffff",
            },
            text: {
              primary: "#1e1e1e",
              secondary: "#4f4f4f",
            },
          }),
      primary: {
        main: mode === "dark" ? "#2f3136" : "#1976d2",
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
      h4: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 600,
      },
      body1: {
        fontWeight: 400,
      },
    },
  });

export default theme;
