import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  spacing: 8,
  palette: {
    primary: {
      light: "#7986cb",
      main: "#3f51b5",
      dark: "#303f9f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#0066ff",
      main: "#f50057",
      dark: "#c51162",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f50057",
      dark: "d32f2f",
      contrastText: "#fff",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        color: "green",
        border: "1px solid grey",
        margin: 10,
      },
    },
  },
});

export default theme;
