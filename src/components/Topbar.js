import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Tooltip,
} from "@material-ui/core";
import GlassIcon from "./GlassIcon";
import DrinkIcon from "@material-ui/icons/LocalDrink";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  mainTitle: {
    color: "white",
    fontSize: 20,
    textTransform: "capitalize",
    marginLeft: theme.spacing(1),
  },
  menuButtonText: {
    color: "white",
    fontSize: 14,
  },
  textBackground: {
    marginLeft: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
  },
  robotDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "inline-block",
    marginLeft: 8,
    verticalAlign: "middle",
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
        #760089 86%) no-repeat`,
  },
  prideTextBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
});

const Topbar = ({ pride, classes, robotUrl, robotConnected, robotState }) => {
  const backgroundClass = pride ? classes.prideBackground : null;

  const robotDotColor = (() => {
    if (!robotUrl) return null;
    if (!robotConnected) return "#f44336";
    const s = robotState && robotState.state;
    if (s === "idle") return "#4caf50";
    if (s === "working" || s === "waiting_for_glass") return "#ff9800";
    if (s === "error") return "#f44336";
    return "#9e9e9e";
  })();

  const robotDotLabel = (() => {
    if (!robotUrl) return null;
    if (!robotConnected) return "Robot: disconnected";
    const s = robotState && robotState.state;
    return s ? `Robot: ${s.replace(/_/g, " ")}` : "Robot: connecting...";
  })();
  const textBackgroundClass = [
    classes.textBackground,
    pride ? classes.prideTextBackground : null,
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
        {robotDotColor && (
          <Tooltip title={robotDotLabel}>
            <span
              className={classes.robotDot}
              style={{ backgroundColor: robotDotColor }}
            />
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  pride: state.settings.pride,
  robotUrl: state.settings.robot && state.settings.robot.url,
  robotConnected: state.robot.connected,
  robotState: state.robot.robotState,
});

export default connect(mapStateToProps)(withStyles(styles)(Topbar));
