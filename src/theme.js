import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

/**
 * override theme defaults here.
 */
const theme = createMuiTheme({
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
