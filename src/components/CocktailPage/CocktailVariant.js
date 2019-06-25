import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  listItem: {
    backgroundColor: theme.palette.background.paper
  },
  ingredients: {
    display: "block",
    fontStyle: "italic",
    marginBottom: theme.spacing(1)
  },
  preparation: {}
});

const CocktailVariant = ({
  cocktail: { name, image, category, glass, preparation, ingredients } = {},
  classes
}) => (
  <ListItem className={classes.listItem} alignItems="flex-start">
    <ListItemAvatar>
      <Avatar alt="Remy Sharp" src={image} />
    </ListItemAvatar>
    <ListItemText
      primary={name}
      secondary={
        <span>
          <span className={classes.ingredients}>{ingredients.join(" - ")}</span>

          <span className={classes.preparation}>{preparation}</span>
        </span>
      }
    />
  </ListItem>
);

export default withStyles(styles)(CocktailVariant);
