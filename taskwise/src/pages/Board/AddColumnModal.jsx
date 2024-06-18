import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addColumnAsync } from "../../features/project/projectSlice";

function AddColumnModal({ open, onClose, id}) {
  const [newColumnName, setNewColumnName] = useState("");
  const dispatch=useDispatch()
  const handleClose = () => {
    setNewColumnName(""); // Clear input field when closing
    onClose();
  };

  const handleAddColumn = () => {
    const data={
        title:newColumnName
    }
    //onAddColumn(newColumnName); // Pass the new column name to the parent component
    dispatch(addColumnAsync({data,id}))
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter the name of the new column:</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          Please enter the name of the new column:
        </DialogContentText> */}
        <TextField
          autoFocus
          margin="dense"
          label="Column Name"
          type="text"
          fullWidth
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddColumn} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddColumnModal;
