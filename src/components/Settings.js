import React from "react";
import { withStyles } from "@material-ui/core/styles";

import {
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Switch,
  TextField,
  MenuItem,
  Divider,
  Chip,
} from "@material-ui/core";

import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { updateSettings, togglePride, toggleLingo } from "../actions";
import { connect } from "react-redux";
import { colors } from "../theme";
import capitalize from "lodash/capitalize";
import keys from "lodash/keys";

const styles = (theme) => ({
  content: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1, 2),
  },
  root: {
    ...theme.mixins.gutters,
    justifyContent: "center",
  },
  formLabel: {
    marginTop: theme.spacing(2),
  },
});

const Settings = ({
  classes,
  settings,
  updateSettings,
  togglePride,
  toggleLingo,
}) => {
  const dispatch = useDispatch();
  const unresolvedLiquids = useSelector(
    (state) => state.robot.unresolvedLiquids,
  );
  const aliases = settings.robot ? settings.robot.ingredientAliases || {} : {};
  const typeOptions = Object.keys(aliases).sort();

  const handleRobotSettingChange = (field) => (e) => {
    updateSettings({
      robot: { ...settings.robot, [field]: e.target.value },
    });
  };

  const handleAssignType = (liquidName, type) => {
    const updated = { ...aliases };
    if (!updated[type]) updated[type] = [type];
    if (!updated[type].includes(liquidName)) {
      updated[type] = [...updated[type], liquidName];
    }
    updateSettings({
      robot: { ...settings.robot, ingredientAliases: updated },
    });
  };

  return (
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
          onChange={(event) => {
            updateSettings({ color: event.target.value });
          }}
        >
          {keys(colors).map((color) => {
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
          onChange={(event) => {
            updateSettings({ browserMode: event.target.value });
          }}
        >
          {["card", "table"].map((browserMode) => {
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
          onChange={(event) => {
            updateSettings({ theme: event.target.value });
          }}
        >
          {["light", "dark"].map((theme) => {
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
          onChange={(event) => {
            updateSettings({ units: event.target.value });
          }}
        >
          {["cl", "ml", "oz", "parts"].map((unit) => {
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
              onChange={(e) => {
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
              onChange={(e) => {
                togglePride();
              }}
              value={settings.pride}
            />
          }
          label={<Typography component="span">Fly the colours</Typography>}
        />

        <Divider style={{ margin: "16px 0" }} />

        <FormLabel className={classes.formLabel} component="legend">
          Robot (CocktailBot HAL)
        </FormLabel>
        <TextField
          label="Robot URL"
          placeholder="http://robot.local"
          fullWidth
          margin="normal"
          value={(settings.robot && settings.robot.url) || ""}
          onChange={handleRobotSettingChange("url")}
        />
        <TextField
          label="Bearer Token"
          type="password"
          fullWidth
          margin="normal"
          value={(settings.robot && settings.robot.token) || ""}
          onChange={handleRobotSettingChange("token")}
        />

        {unresolvedLiquids.length > 0 && (
          <>
            <FormLabel className={classes.formLabel} component="legend">
              Unrecognised robot liquids — assign a type
            </FormLabel>
            {unresolvedLiquids.map((liquid) => (
              <div
                key={liquid.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  margin: "8px 0",
                }}
              >
                <Chip label={liquid.name} />
                <TextField
                  select
                  label="Type"
                  style={{ minWidth: 200 }}
                  defaultValue=""
                  onChange={(e) =>
                    handleAssignType(liquid.name, e.target.value)
                  }
                >
                  {typeOptions.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            ))}
          </>
        )}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  updateSettings: bindActionCreators(updateSettings, dispatch),
  togglePride: bindActionCreators(togglePride, dispatch),
  toggleLingo: bindActionCreators(toggleLingo, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Settings));
