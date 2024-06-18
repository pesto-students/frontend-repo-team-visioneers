import React, { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { moveTaskAsync, deactivateTaskAsync, resetTaskDeleteStatus } from "../../features/project/projectSlice";

const Dropdown = ({ task, columnId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const open = Boolean(anchorEl);
  const order = useSelector((state) => state?.project?.selectedProject?.order);
  const colIndex = order?.indexOf(columnId);
  const { id } = useParams();
  const taskId = task._id;
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const taskDeleteStatus = useSelector((state) => state?.project?.taskDeleteStatus);
  useEffect(() => {
    if (taskDeleteStatus === "fulfilled") {
      toast.success("Task deleted successfully");
    }
    if (taskDeleteStatus === "rejected") {
      toast.error("Task is not deleted");
    }
    dispatch(resetTaskDeleteStatus());
  }, [taskDeleteStatus, dispatch]);
    // eslint-disable-next-line
  const handleMoveLeft = () => {
    if (colIndex > 0) {
      const sourceColumnId = columnId;
      const destinationColumnId = order[colIndex - 1];
      const data = {
        sourceColumnId,
        destinationColumnId
      };
      const idObject = { id, taskId };
      dispatch(moveTaskAsync({ data, idObject }));
    }
    handleClose();
  };
    // eslint-disable-next-line
  const handleMoveRight = () => {
    if (colIndex < order?.length - 1) {
      const sourceColumnId = columnId;
      const destinationColumnId = order[colIndex + 1];
      const data = {
        sourceColumnId,
        destinationColumnId
      };
      const idObject = { id, taskId };
      dispatch(moveTaskAsync({ data, idObject }));
    }
    handleClose();
  };

  const handleDelete = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    handleClose();
  };

  const handleConfirmDelete = () => {
    const idObject = { projectId: id, taskId };
    dispatch(deactivateTaskAsync(idObject));
    handleDialogClose();
    handleClose();
  };

  return (
    <div>
      <ToastContainer />
      <IconButton
        aria-controls={open ? 'dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        color="neutral"
        size="small"
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {/* {colIndex > 0 && (
          <MenuItem onClick={handleMoveLeft}>Move to left</MenuItem>
        )}
        {colIndex < order?.length - 1 && (
          <MenuItem onClick={handleMoveRight}>Move to right</MenuItem>
        )} */}
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dropdown;
