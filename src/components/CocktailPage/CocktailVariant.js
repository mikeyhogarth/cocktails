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
  }
});

const CocktailVariant = ({
  cocktail: { name, image, category, glass, preparation, ingredients } = {},
  classes
}) => (
  <ListItem className={classes.listItem} alignItems="flex-start">
    <ListItemAvatar>
      <Avatar alt="Remy Sharp" src={image} />
    </ListItemAvatar>
    <ListItemText primary={name} secondary={ingredients.join(" - ")} />
  </ListItem>
);

export default withStyles(styles)(CocktailVariant);
