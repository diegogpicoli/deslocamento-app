"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
function ThemeStyle({ children }: { children: React.ReactNode }) {
  const darkTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#6636d7",
        light: "#ff9999",
        dark: "#990000",
        contrastText: "#ffffff"
      }
    }
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
export default ThemeStyle;
