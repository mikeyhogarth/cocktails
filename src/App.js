import React from "react";
import Theme from "./theme";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CocktailIcon from "@material-ui/icons/LocalBar";
import SettingsIcon from "@material-ui/icons/Settings";
import Hidden from "@material-ui/core/Hidden";
import CocktailBrowser from "./components/CocktailBrowser";
import CocktailPage from "./components/CocktailPage";
import Bar from "./components/Bar";
import Settings from "./components/Settings";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

const styles = {
  grow: {
    flexGrow: 1
  },
  title: {
    color: "white",
    margin: ".3em",
    fontSize: 20
  },
  prideBackground: {
    background: `linear-gradient(to bottom,
        #e70000 0,
        #e70000 16%,
        #ff8c00 16%,
        #ff8c00 32%,
        #ffd400 32%,
        #ffd400 48%,
        #00811f 48%,
        #00811f 66%,
        #0044ff 66%,
        #0044ff 86%,
        #760089 86%) no-repeat`
  }
};

function App({ pride, classes }) {
  return (
    <Theme>
      <Router>
        <AppBar
          position="static"
          className={pride ? classes.prideBackground : null}
        >
          <Toolbar>
            <Button component={Link} to="/cocktails" color="inherit">
              <CocktailIcon />
            </Button>

            <Typography component="h1" className={classes.grow}>
              <Link to="/cocktails" style={{ textDecoration: "none" }}>
                <Hidden xsDown>
                  <span className={classes.title}>Cocktail Browser</span>
                </Hidden>
              </Link>
            </Typography>
            <Button component={Link} to="/cocktails" color="inherit">
              Browse
            </Button>
            <Button component={Link} to="/my-bar" color="inherit">
              Bar
            </Button>
            <Button component={Link} to="/settings" color="inherit">
              <SettingsIcon />
              Settings
            </Button>
          </Toolbar>
        </AppBar>
        {
          // Routes
        }
        <Route exact path={["/", "/cocktails"]} component={CocktailBrowser} />
        <Route path="/my-bar" component={Bar} />
        <Route path={"/cocktails/:slug"} component={CocktailPage} />
        <Route path="/settings" component={Settings} />
      </Router>
    </Theme>
  );
}

const mapStateToProps = state => ({
  pride: state.settings.pride
});

export default connect(mapStateToProps)(withStyles(styles)(App));
