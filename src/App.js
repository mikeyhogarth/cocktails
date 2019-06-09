import React from "react";
import Theme from "./theme";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CocktailIcon from "@material-ui/icons/LocalBar";
import DrinkIcon from "@material-ui/icons/LocalDrink";
import SearchIcon from "@material-ui/icons/Search";
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
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  mainTitle: {
    color: "white",
    fontSize: 20
  },
  menuButtonText: {
    color: "white",
    fontSize: 14
  },
  icon: {
    marginRight: ".3em"
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
        <div className={classes.grow}>
          <AppBar
            position="sticky"
            className={pride ? classes.prideBackground : null}
          >
            <Toolbar>
              <div className={classes.title}>
                <Button component={Link} to="/cocktails" color="inherit">
                  <CocktailIcon className={classes.icon} />
                  <Typography
                    style={{ textTransform: "capitalize" }}
                    className={classes.mainTitle}
                    variant="h6"
                  >
                    <Hidden xsDown>Cocktail Browser</Hidden>
                  </Typography>
                </Button>
              </div>
              <Button component={Link} to="/cocktails" color="inherit">
                <SearchIcon className={classes.icon} />
                <Hidden xsDown>
                  <Typography className={classes.menuButtonText} variant="h6">
                    Browse
                  </Typography>
                </Hidden>
              </Button>
              <Button component={Link} to="/my-bar" color="inherit">
                <DrinkIcon className={classes.icon} />
                <Hidden xsDown>
                  <Typography className={classes.menuButtonText} variant="h6">
                    Bar
                  </Typography>
                </Hidden>
              </Button>
              <Button component={Link} to="/settings" color="inherit">
                <SettingsIcon className={classes.icon} />
                <Hidden xsDown>
                  <Typography className={classes.menuButtonText} variant="h6">
                    Settings
                  </Typography>
                </Hidden>
              </Button>
            </Toolbar>
          </AppBar>
        </div>
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
