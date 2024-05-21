// src/index.js
import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from the correct module
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useMemo } from "react";

const Root = () => {
  // ... (Your Root component code remains exactly the same)
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App toggleColorMode={toggleColorMode} />{" "}
    </ThemeProvider>
  );
};

// Change the way your app is rendered
const root = createRoot(document.getElementById("root")); // Create a root
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
); // Render your app into the root
