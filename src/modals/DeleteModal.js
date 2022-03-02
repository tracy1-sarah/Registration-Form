import React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

function DeleteModal({ handleClosed }) {
  return (
    <div>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this field?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={handleClosed}>
          Delete
        </Button>
        <Button onClick={handleClosed}>Cancel</Button>
      </DialogActions>
    </div>
  );
}

export default DeleteModal;
