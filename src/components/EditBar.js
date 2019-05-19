import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import IngredientPicker from "./IngredientPicker";

const styles = theme => ({
  explanation: {
    marginBottom: "1em",
    padding: "1em 2em"
  },
  root: {
    ...theme.mixins.gutters,
    justifyContent: "center",
    padding: "2em 4em"
  }
});

const EditBar = ({ classes, allIngredients, bar, setBar }) => {
  return (
    <div className={classes.root}>
      <Paper className={classes.explanation}>
        <Typography color="inherit">
          <h2>Your Bar</h2>
        </Typography>
        <Typography color="inherit">
          <p>
            Currently these selections are not persisted (so if you refresh your
            page or leave and come back, you'll need to set them up again). What
            this gives you is the ability to say what you have in, then back on
            the cocktail browser you can set the filter to only show you things
            you can make.
          </p>
        </Typography>

        <Typography color="inherit">
          <p>
            <strong>Select the ingredients you have in your bar...</strong>
          </p>
        </Typography>

        <IngredientPicker
          allIngredients={allIngredients}
          selectedIngredients={bar}
          onIngredientsChange={selectedIngredients => {
            setBar(selectedIngredients);
          }}
        />
        <br />
        <Button component={Link} to="/" color="secondary" variant="contained">
          Take me back to the cocktails!
        </Button>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(EditBar);
