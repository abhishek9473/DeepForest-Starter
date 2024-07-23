import React from "react";
import { ThemeProvider } from "@mui/material";
import RoutesComponent from "./Router/routes";
import theme from "./theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <RoutesComponent />
    </ThemeProvider>
  );
};

export default App;
