import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import indigo from "@material-ui/core/colors/indigo";
import red from "@material-ui/core/colors/red";
import teal from "@material-ui/core/colors/teal";
import brown from "@material-ui/core/colors/brown";
import pink from "@material-ui/core/colors/pink";

import { connect } from "react-redux";

export const colorThemes = {
  indigo,
  red,
  teal,
  brown,
  pink
};

/**
 * override theme defaults here.
 */
function createTheme(primaryColor) {
  return createMuiTheme({
    palette: {
      primary: colorThemes[primaryColor]
    },
    typography: {
      useNextVariants: true
    }
  });
}

const mapStateToProps = state => ({
  primaryColor: state.settings.theme
});

const Theme = ({ primaryColor, children }) => (
  <MuiThemeProvider theme={createTheme(primaryColor)}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);

export default connect(mapStateToProps)(Theme);
