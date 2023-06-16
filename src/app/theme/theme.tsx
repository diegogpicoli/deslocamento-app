"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
function ThemeStyle({ children }: { children: React.ReactNode }) {
  const darkTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#6636D7" // Altere para a cor desejada para o tema primário
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
