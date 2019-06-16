import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardActionArea,
  Button,
  Typography
} from "@material-ui/core";
import LocalBar from "@material-ui/icons/LocalBar";
import Redo from "@material-ui/icons/Redo";

import { withStyles } from "@material-ui/core/styles";
import Ingredient from "./IngredientDetail";
import { Link } from "react-router-dom";

const styles = theme => ({
  circle: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    display: "inline-block",
    float: "right"
  },
  card: {
    width: "25em",
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  cardMain: {
    flexGrow: 10
  },
  actions: {
    alignSelf: "flex-end",
    flexGrow: 1
  },

  cardContent: {},
  button: {
    padding: theme.spacing(0.5, 1)
  },
  title: {
    fontSize: 20,
    marginTop: 0,
    marginBottom: 0
  },
  subHeader: {
    fontSize: 14,
    fontStyle: "italic"
  },
  category: {
    fontSize: 12
  },
  prep: {
    fontStyle: "italic"
  }
});

const CocktailItem = ({ cocktail, classes }) => (
  <Card className={classes.card}>
    <CardActionArea
      className={classes.cardMain}
      component={Link}
      to={`/cocktails/${cocktail.slug}`}
    >
      <CardHeader
        title={
          <h1 className={classes.title}>
            {cocktail.name}
            {cocktail.colors.map(color => (
              <i
                key={color}
                className={classes.circle}
                style={{ background: color }}
              />
            ))}
          </h1>
        }
        subheader={
          <span className={classes.subHeader}>{cocktail.category}</span>
        }
      />
      <CardContent>
        <ul>
          {cocktail.ingredients.map((item, idx) => (
            <li key={idx}>
              <Typography className={classes.ingredients}>
                <Ingredient item={item} />
              </Typography>
            </li>
          ))}
        </ul>
        <br />
        <Typography component="p" className={classes.prep}>
          {cocktail.preparation}
        </Typography>
        <br />
        {cocktail.glass && (
          <Typography component="p" color="textSecondary">
            <LocalBar fontSize="inherit" />
            &nbsp;
            {cocktail.glass}
          </Typography>
        )}
        {cocktail.garnish && (
          <Typography component="p" color="textSecondary">
            <Redo fontSize="inherit" />
            &nbsp;
            {cocktail.garnish}
          </Typography>
        )}
      </CardContent>
    </CardActionArea>

    <CardActions className={classes.actions}>
      <Button
        component={Link}
        to={`/cocktails/${cocktail.slug}`}
        className={classes.button}
        size="large"
        color="primary"
      >
        Learn More
      </Button>
    </CardActions>
  </Card>
);

export default withStyles(styles)(CocktailItem);
