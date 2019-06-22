import React from "react";
import { Chip } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  chip: { marginRight: theme.spacing(0.5), marginTop: theme.spacing(0.5) }
});

const Definition = ({ title, description, classes }) => {
  if (!description) return null;
  return (
    <Chip color="secondary" label={description} className={classes.chip} />
  );
};

export default withStyles(styles)(Definition);
