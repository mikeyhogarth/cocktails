import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import GlassIcon from "./GlassIcon";
import DrinkIcon from "@material-ui/icons/LocalDrink";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  mainTitle: {
    color: "white",
    fontSize: 20,
    textTransform: "capitalize",
    marginLeft: theme.spacing(1)
  },
  menuButtonText: {
    color: "white",
    fontSize: 14
  },
  textBackground: {
    marginLeft: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1)
  },
  /** Pride specific styles */
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
  },
  prideTextBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.25)"
  }
});

const Topbar = ({ pride, classes }) => {
  const backgroundClass = pride ? classes.prideBackground : null;
  const textBackgroundClass = [
    classes.textBackground,
    pride ? classes.prideTextBackground : null
  ].join(" ");

  return (
    <AppBar position="sticky" className={backgroundClass}>
      <Toolbar>
        <div className={classes.root}>
          <Button
            className={textBackgroundClass}
            component={Link}
            to="/cocktails"
            color="inherit"
          >
            <GlassIcon type="martini" />
            <Typography className={classes.mainTitle} component="h1">
              <Hidden xsDown>Cocktail Browser</Hidden>
            </Typography>
          </Button>
        </div>
        <Button
          className={textBackgroundClass}
          component={Link}
          to="/cocktails"
          color="inherit"
        >
          <SearchIcon />
          <Hidden xsDown>
            <Typography className={classes.menuButtonText}>Browse</Typography>
          </Hidden>
        </Button>
        <Button
          className={textBackgroundClass}
          component={Link}
          to="/my-bar"
          color="inherit"
        >
          <DrinkIcon />
          <Hidden xsDown>
            <Typography className={classes.menuButtonText}>Bar</Typography>
          </Hidden>
        </Button>
        <Button
          className={textBackgroundClass}
          component={Link}
          to="/settings"
          color="inherit"
        >
          <SettingsIcon />
          <Hidden xsDown>
            <Typography className={classes.menuButtonText}>Settings</Typography>
          </Hidden>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  pride: state.settings.pride
});

export default connect(mapStateToProps)(withStyles(styles)(Topbar));
