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

const styles = {
  grow: {
    flexGrow: 1
  },
  title: {
    margin: ".3em",
    color: "white",
    fontSize: 20
  }
};

function App({ classes }) {
  return (
    <Theme>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <CocktailIcon />
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

export default withStyles(styles)(App);
