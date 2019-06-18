import React from "react";
import { Fab } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { withStyles } from "@material-ui/core/styles";
import useScroll from "../hooks/useScroll";
import Slide from "@material-ui/core/Slide";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const styles = theme => ({
  scrollTopButton: {
    position: "fixed",
    bottom: theme.spacing(),
    right: theme.spacing()
  },
  hidden: {
    display: "none"
  }
});

const ScrollTopButton = ({ classes }) => {
  const scrollPos = useScroll();
  const visible = scrollPos > 100;

  return (
    <Slide in={visible} direction="up">
      <Fab
        onClick={scrollToTop}
        color="secondary"
        aria-label="Return to top"
        className={classes.scrollTopButton}
      >
        <ArrowUpwardIcon />
      </Fab>
    </Slide>
  );
};

export default withStyles(styles)(ScrollTopButton);
