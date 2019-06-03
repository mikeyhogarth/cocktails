import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import indigo from "@material-ui/core/colors/indigo";
import red from "@material-ui/core/colors/red";
import teal from "@material-ui/core/colors/teal";
import brown from "@material-ui/core/colors/brown";
import pink from "@material-ui/core/colors/pink";

import { connect } from "react-redux";

export const colors = {
  indigo,
  red,
  teal,
  brown,
  pink
};

/**
 * override theme defaults here.
 */
function createTheme(color, theme) {
  return createMuiTheme({
    palette: {
      primary: colors[color],
      type: theme
    },
    typography: {
      useNextVariants: true
    }
  });
}

const mapStateToProps = state => ({
  color: state.settings.color,
  theme: state.settings.theme
});

const Theme = ({ color, theme, children }) => (
  <MuiThemeProvider theme={createTheme(color, theme)}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);

export default connect(mapStateToProps)(Theme);
