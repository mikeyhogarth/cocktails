import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
  Button
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateFilter, closeFilterDialog } from "../../actions";
import CloseIcon from "@material-ui/icons/Close";
import { dialogFor, labelFor } from "../../filterConfig";

const styles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const FilterDialog = ({
  classes,
  closeFilterDialog,
  filterOptions: { activeDialog }
}) => {
  function handleCloseDialog() {
    closeFilterDialog();
  }
  const DialogContentComponent = dialogFor(activeDialog);

  return (
    <Dialog
      open={!!activeDialog}
      fullWidth={true}
      onClose={handleCloseDialog}
      aria-labelledby="simple-dialog-title"
    >
      <>
        <DialogTitle id="simple-dialog-title">
          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={handleCloseDialog}
          >
            <CloseIcon />
          </IconButton>
          {labelFor(activeDialog)}
        </DialogTitle>
        {DialogContentComponent && <DialogContentComponent />}
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </>
    </Dialog>
  );
};

const mapStateToProps = state => ({
  filterOptions: state.filterOptions
});

const mapDispatchToProps = dispatch => ({
  updateFilter: bindActionCreators(updateFilter, dispatch),
  closeFilterDialog: bindActionCreators(closeFilterDialog, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterDialog));
