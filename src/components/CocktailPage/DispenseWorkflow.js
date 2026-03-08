import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  LinearProgress,
  FormControlLabel,
  Checkbox,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { robotJobUpdated } from "../../actions";

function resolveDispensableIngredients(cocktail, robotConfig, bar) {
  if (!robotConfig || !robotConfig.liquids)
    return { dispensable: [], manual: [] };

  const dispensable = [];
  const manual = [];

  cocktail.ingredients.forEach((item) => {
    const barEntry = bar.find(
      (b) =>
        b && (b.type === item.ingredient || b.ingredient === item.ingredient),
    );
    if (!barEntry || barEntry.source !== "robot") {
      manual.push(item);
      return;
    }
    const liquid = robotConfig.liquids.find(
      (l) => l.name === barEntry.ingredient,
    );
    if (!liquid) {
      manual.push(item);
      return;
    }
    dispensable.push({ ...item, liquid_id: liquid.id });
  });

  return { dispensable, manual };
}

function DispenseWorkflow({ cocktail, onClose }) {
  const dispatch = useDispatch();
  const robotConfig = useSelector((state) => state.robot.robotConfig);
  const robotState = useSelector((state) => state.robot.robotState);
  const bar = useSelector((state) => state.bar);
  const activeJobId = useSelector((state) => state.robot.activeJobId);
  const robotUrl = useSelector((state) => state.settings.robot.url);
  const token = useSelector((state) => state.settings.robot.token);

  const [step, setStep] = useState("premix"); // premix | working | postmix | error
  const [ready, setReady] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const glassSizes =
    robotConfig && robotConfig.glass_types ? robotConfig.glass_types : [];

  const { dispensable, manual } = resolveDispensableIngredients(
    cocktail,
    robotConfig,
    bar,
  );

  // Track robot state changes
  const robotStateName = robotState && robotState.state;
  const progressPct =
    robotState && robotState.state === "working" ? robotState.progress_pct : 0;

  // Transition steps based on robot state when we have an active job
  React.useEffect(() => {
    if (!activeJobId) return;
    if (
      robotStateName === "working" ||
      robotStateName === "waiting_for_glass"
    ) {
      setStep("working");
    } else if (robotStateName === "drink_ready") {
      setStep("postmix");
    } else if (robotStateName === "error") {
      setErrorMsg(
        robotState.message || "An error occurred. Please check the robot.",
      );
      setStep("error");
    }
  }, [robotStateName, activeJobId, robotState]);

  const handleMix = async () => {
    if (!selectedSize) return;

    const items = dispensable.map((d) => ({
      liquid_id: d.liquid_id,
      parts: d.amount,
    }));

    const payload = {
      name: cocktail.name,
      size: selectedSize,
      items,
    };

    try {
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };
      const res = await fetch(`${robotUrl}/v1/dispense/jobs`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (res.status === 503) {
        setErrorMsg("Robot is busy. Please wait and try again.");
        setStep("error");
        return;
      }

      if (!res.ok) {
        setErrorMsg(`Unexpected error (${res.status}).`);
        setStep("error");
        return;
      }

      const { job_id } = await res.json();
      dispatch(robotJobUpdated(job_id));
      setStep("working");
    } catch (err) {
      setErrorMsg("Could not reach the robot. Check your connection.");
      setStep("error");
    }
  };

  const handleDone = () => {
    dispatch(robotJobUpdated(null));
    onClose();
  };

  const handleErrorDismiss = () => {
    dispatch(robotJobUpdated(null));
    setStep("premix");
    setErrorMsg(null);
  };

  return (
    <Dialog
      open
      onClose={step === "premix" ? onClose : undefined}
      maxWidth="sm"
      fullWidth
    >
      {step === "premix" && (
        <>
          <DialogTitle>Make {cocktail.name}</DialogTitle>
          <DialogContent>
            {manual.length > 0 && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Prepare manually before mixing:
                </Typography>
                <List dense>
                  {manual.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemText
                        primary={`${item.amount} ${item.unit} ${item.ingredient}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
            <Typography variant="subtitle1" gutterBottom>
              Preparation guide:
            </Typography>
            <Typography variant="body2" paragraph>
              {cocktail.preparation}
            </Typography>
            <TextField
              select
              label="Glass size"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              fullWidth
              margin="normal"
            >
              {glassSizes.map((g) => (
                <MenuItem key={g.id} value={g.id}>
                  {g.id}
                </MenuItem>
              ))}
            </TextField>
            <FormControlLabel
              control={
                <Checkbox
                  checked={ready}
                  onChange={(e) => setReady(e.target.checked)}
                />
              }
              label="I'm ready — glass is prepared and placed on the robot"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!ready || !selectedSize}
              onClick={handleMix}
            >
              Mix!
            </Button>
          </DialogActions>
        </>
      )}

      {step === "working" && (
        <>
          <DialogTitle>
            {robotStateName === "waiting_for_glass"
              ? "Place your glass on the robot"
              : `Mixing ${cocktail.name}…`}
          </DialogTitle>
          <DialogContent>
            {robotStateName === "waiting_for_glass" ? (
              <Typography>
                The robot is ready. Place your glass on the platform.
              </Typography>
            ) : (
              <>
                <LinearProgress variant="determinate" value={progressPct} />
                <Typography style={{ marginTop: 8 }}>
                  {progressPct}% complete
                </Typography>
              </>
            )}
          </DialogContent>
        </>
      )}

      {step === "postmix" && (
        <>
          <DialogTitle>Your {cocktail.name} is ready!</DialogTitle>
          <DialogContent>
            {cocktail.garnish && (
              <>
                <Typography variant="subtitle1">Finish with:</Typography>
                <Typography paragraph>{cocktail.garnish}</Typography>
              </>
            )}
            {manual.length > 0 && (
              <>
                <Typography variant="subtitle1">
                  Don't forget to add:
                </Typography>
                <List dense>
                  {manual.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemText primary={item.ingredient} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
            <Typography>Enjoy!</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={handleDone}>
              Done
            </Button>
          </DialogActions>
        </>
      )}

      {step === "error" && (
        <>
          <DialogTitle>Something went wrong</DialogTitle>
          <DialogContent>
            <Typography color="error">{errorMsg}</Typography>
            {robotState && robotState.recovery && (
              <Typography style={{ marginTop: 8 }}>
                Recovery: {robotState.recovery.replace(/_/g, " ")}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleErrorDismiss}>Dismiss</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default DispenseWorkflow;
