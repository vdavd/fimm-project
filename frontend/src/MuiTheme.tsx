// @ts-ignore
import "@fontsource/inter";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", Arial, sans-serif',
    h1: { color: "#F6FAFC", fontFamily: '"Inter", Arial, sans-serif' },
    h2: { color: "#F6FAFC", fontFamily: '"Inter", Arial, sans-serif' },
    h3: { color: "#F6FAFC", fontFamily: '"Inter", Arial, sans-serif' },
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: { borderRadius: 40 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#F6FAFC",
        },
      },
    },
  },
});

export default theme;
