import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import indigo from "@material-ui/core/colors/indigo";

/**
 * override theme defaults here.
 */
const theme = createMuiTheme({
  palette: {
    indigo
  },
  typography: {
    useNextVariants: true
  }
});

export default props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {props.children}
  </MuiThemeProvider>
);
