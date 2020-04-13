import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import GlobalData from "./GlobalData";
import PublicIcon from "@material-ui/icons/Public";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ paddingTop: 5, textAlign: "center" }}>
      <Button
        startIcon={<PublicIcon></PublicIcon>}
        style={{ borderColor: "#FFFFFF", color: "#FFFFFF" }}
        variant="outlined"
        color="secondary"
        onClick={handleClickOpen}
      >
        Show Global Data
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{ textAlign: "center", color: "#9e9e9e" }}
          id="alert-dialog-title"
        >
          {"Corona Global Data"}
        </DialogTitle>
        <DialogContent>
          <GlobalData></GlobalData>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
