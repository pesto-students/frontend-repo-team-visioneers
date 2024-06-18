import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { columnOrderChangeAsync } from '../../features/project/projectSlice';

const ColumnDropdown = ({ column, id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch=useDispatch()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const order = useSelector((state) => state.project.selectedProject.order);
  const colId = column?._id;
  const colIndex = order?.indexOf(colId);
  console.log(id,"id")

  const handleMoveLeft = () => {
    if (colIndex > 0) {
      const newOrder = [...order];
      [newOrder[colIndex - 1], newOrder[colIndex]] = [newOrder[colIndex], newOrder[colIndex - 1]];
      //dispatch(updateColumnOrder(newOrder));
      dispatch(columnOrderChangeAsync({order:newOrder,projectId:id}))
    }
    handleClose();
  };

  const handleMoveRight = () => {
    if (colIndex < order?.length - 1) {
      const newOrder = [...order];
      [newOrder[colIndex + 1], newOrder[colIndex]] = [newOrder[colIndex], newOrder[colIndex + 1]];
      dispatch(columnOrderChangeAsync({order:newOrder,projectId:id}))
    }
    handleClose();
  };


  return (
    <div>
      <IconButton
        aria-controls={open ? 'column-dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        color="neutral"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="column-dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {colIndex > 0 && (
          <MenuItem onClick={handleMoveLeft}>Move to left</MenuItem>
        )}
        {colIndex < order?.length - 1 && (
          <MenuItem onClick={handleMoveRight}>Move to right</MenuItem>
        )}
        {/* <MenuItem onClick={handleClose}>Delete</MenuItem> */}
      </Menu>
    </div>
  );
};

export default ColumnDropdown;
