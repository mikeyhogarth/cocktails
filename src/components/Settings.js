import React from "react";
import { withStyles } from "@material-ui/core/styles";

import {
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Switch
} from "@material-ui/core";

import { updateSettings, togglePride } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "../theme";
import capitalize from "lodash/capitalize";
import keys from "lodash/keys";

const styles = theme => ({
  content: {
    marginBottom: "1em",
    padding: "1em 2em"
  },
  root: {
    ...theme.mixins.gutters,
    justifyContent: "center"
  }
});

const Settings = ({ classes }) => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings);

  return (
    <div className={classes.root}>
      <Paper className={classes.content}>
        <Typography variant="h2" gutterBottom>
          Settings
        </Typography>

        <FormControl component="fieldset">
          <FormLabel component="legend">Color</FormLabel>
          <RadioGroup
            aria-label="Color"
            name="color"
            value={settings.color}
            onChange={event => {
              dispatch(updateSettings({ color: event.target.value }));
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
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Theme</FormLabel>
          <RadioGroup
            aria-label="Theme"
            name="theme"
            value={settings.theme}
            onChange={event => {
              dispatch(updateSettings({ theme: event.target.value }));
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
        </FormControl>

        <FormControl>
          <FormLabel component="legend">Pride!</FormLabel>

          <FormControlLabel
            control={
              <Switch
                checked={settings.pride}
                onChange={e => {
                  dispatch(togglePride());
                }}
                value={settings.pride}
              />
            }
            label={<Typography component="span">Fly the colours</Typography>}
          />
        </FormControl>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Settings);
