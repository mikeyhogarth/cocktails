import React from "react";
import { withStyles } from "@material-ui/core/styles";

import {
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Switch
} from "@material-ui/core";

import { bindActionCreators } from "redux";
import { updateSettings, togglePride, toggleLingo } from "../actions";
import { connect } from "react-redux";
import { colors } from "../theme";
import capitalize from "lodash/capitalize";
import keys from "lodash/keys";

const styles = theme => ({
  content: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1, 2)
  },
  root: {
    ...theme.mixins.gutters,
    justifyContent: "center"
  },
  formLabel: {
    marginTop: theme.spacing(2)
  }
});

const Settings = ({
  classes,
  settings,
  updateSettings,
  togglePride,
  toggleLingo
}) => (
  <div className={classes.root}>
    <Paper className={classes.content}>
      <Typography variant="h2" gutterBottom>
        Settings
      </Typography>

      <FormLabel className={classes.formLabel} component="legend">
        Color
      </FormLabel>
      <RadioGroup
        row
        aria-label="Color"
        name="color"
        value={settings.color}
        onChange={event => {
          updateSettings({ color: event.target.value });
        }}
      >
        {keys(colors).map(color => {
          return (
            <FormControlLabel
              value={color}
              key={color}
              control={<Radio />}
              label={capitalize(color)}
            />
          );
        })}
      </RadioGroup>

      <FormLabel className={classes.formLabel} component="legend">
        Browser mode
      </FormLabel>
      <RadioGroup
        row
        aria-label="BrowserMode"
        name="browserMode"
        value={settings.browserMode}
        onChange={event => {
          updateSettings({ browserMode: event.target.value });
        }}
      >
        {["card", "table"].map(browserMode => {
          return (
            <FormControlLabel
              value={browserMode}
              key={browserMode}
              control={<Radio />}
              label={capitalize(browserMode)}
            />
          );
        })}
      </RadioGroup>

      <FormLabel className={classes.formLabel} component="legend">
        Theme
      </FormLabel>
      <RadioGroup
        row
        aria-label="Theme"
        name="theme"
        value={settings.theme}
        onChange={event => {
          updateSettings({ theme: event.target.value });
        }}
      >
        {["light", "dark"].map(theme => {
          return (
            <FormControlLabel
              value={theme}
              key={theme}
              control={<Radio />}
              label={capitalize(theme)}
            />
          );
        })}
      </RadioGroup>

      <FormLabel className={classes.formLabel} component="legend">
        Units
      </FormLabel>
      <RadioGroup
        row
        aria-label="Units"
        name="units"
        value={settings.units}
        onChange={event => {
          updateSettings({ units: event.target.value });
        }}
      >
        {["cl", "ml", "oz", "parts"].map(unit => {
          return (
            <FormControlLabel
              value={unit}
              key={unit}
              control={<Radio />}
              label={unit}
            />
          );
        })}
      </RadioGroup>

      <FormLabel className={classes.formLabel} component="legend">
        Pro-mode
      </FormLabel>
      <FormControlLabel
        control={
          <Switch
            checked={settings.lingo}
            onChange={e => {
              toggleLingo();
            }}
            value={settings.lingo}
          />
        }
        label={<Typography component="span">Use Bartender Lingo</Typography>}
      />

      <FormLabel className={classes.formLabel} component="legend">
        Pride!
      </FormLabel>

      <FormControlLabel
        control={
          <Switch
            checked={settings.pride}
            onChange={e => {
              togglePride();
            }}
            value={settings.pride}
          />
        }
        label={<Typography component="span">Fly the colours</Typography>}
      />
    </Paper>
  </div>
);

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  updateSettings: bindActionCreators(updateSettings, dispatch),
  togglePride: bindActionCreators(togglePride, dispatch),
  toggleLingo: bindActionCreators(toggleLingo, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Settings));
