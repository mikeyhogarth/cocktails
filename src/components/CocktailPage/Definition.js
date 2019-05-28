import React from "react";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  dt: { fontWeight: "bold" },
  dd: { marginLeft: 0, marginBottom: ".5em" }
});

const Definition = ({ title, description, classes }) => {
  if (!description) return null;
  return (
    <>
      <dt className={classes.dt}>{title}</dt>
      <dd className={classes.dd}>{description}</dd>
    </>
  );
};

export default withStyles(styles)(Definition);
