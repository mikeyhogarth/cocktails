import React, { useState } from "react";
import { useSelector } from "react-redux";
import DispenseWorkflow from "./DispenseWorkflow";
import { Typography, Paper, Button } from "@material-ui/core";
import { allGlassesSelector } from "../../selectors";
import IngredientDetail from "../IngredientDetail";
import Definition from "./Definition";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const styles = (theme) => ({
  definitions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  cocktailDetailPaper: {
    padding: theme.spacing(2),
  },
  cocktailTitle: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "3rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "4rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "5rem",
    },
  },
});

const CocktailPage = ({ cocktail, allGlasses, classes }) => {
  const [showDispense, setShowDispense] = useState(false);
  const robotUrl = useSelector(
    (state) => state.settings.robot && state.settings.robot.url,
  );
  const robotConnected = useSelector((state) => state.robot.connected);
  const robotState = useSelector((state) => state.robot.robotState);
  const bar = useSelector((state) => state.bar);

  const robotIdle = robotConnected && robotState && robotState.state === "idle";

  // Check if at least one cocktail ingredient matches a robot-loaded bar entry
  const hasDispensable = bar.some(
    (item) =>
      item &&
      item.source === "robot" &&
      cocktail.ingredients.some(
        (ing) =>
          ing.ingredient === item.type || ing.ingredient === item.ingredient,
      ),
  );

  const canDispense = !!robotUrl && robotIdle && hasDispensable;
  const robotBusy =
    robotConnected &&
    robotState &&
    ["working", "waiting_for_glass", "drink_ready"].includes(robotState.state);

  const {
    name,
    ingredients,
    preparation,
    category,
    glass,
    vegan,
    garnish,
    enrichment,
    enriched,
  } = cocktail;

  return (
    <>
      <Typography className={classes.cocktailTitle} variant="h1">
        {name}
      </Typography>

      <div className={classes.definitions}>
        <Definition title="Category" description={category} />
        <Definition
          title="Glass"
          description={allGlasses[glass.toString()].name}
        />
        <Definition title="Garnish" description={garnish} />
        {!vegan && <Definition title="Vegan" description={"Non-vegan"} />}

        {enriched && enrichment.ibaCategory && (
          <Definition
            title="IBA Category"
            description={enrichment.ibaCategory}
          />
        )}
      </div>
      <Paper className={classes.cocktailDetailPaper}>
        <Typography component="ul" gutterBottom>
          <>
            {ingredients.map((ingredient, idx) => {
              return (
                <li key={`ingredient-${idx}`}>
                  <IngredientDetail item={ingredient} />
                </li>
              );
            })}
          </>
        </Typography>
        <br />
        <Typography component="p">{preparation}</Typography>
      </Paper>
      {robotUrl && (
        <div style={{ marginTop: 16 }}>
          <Button
            variant="contained"
            color="primary"
            disabled={!canDispense}
            onClick={() => setShowDispense(true)}
            title={
              !robotConnected
                ? "Robot not connected"
                : robotBusy
                  ? "Robot is busy"
                  : !hasDispensable
                    ? "No ingredients loaded on robot"
                    : undefined
            }
          >
            Make it!
          </Button>
        </div>
      )}
      {showDispense && (
        <DispenseWorkflow
          cocktail={cocktail}
          onClose={() => setShowDispense(false)}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  allGlasses: allGlassesSelector(state),
});

export default connect(mapStateToProps)(withStyles(styles)(CocktailPage));
