import { Typography, IconButton, Box, TextField, CircularProgress } from "@mui/material";
import React from "react";
import Task from "./Task";
import { useDrop } from "react-dnd";
import ColumnDropdown from "./ColumnDropdown";
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from "react-redux";
import { editColumnAsync } from "../../features/project/projectSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";



function Column({ column, tasks, onDrop }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [editTitle, setEditTitle] = useState(column.title);
  const dispatch = useDispatch();
  const { id } = useParams();
  const editingColumn = useSelector((state) => state?.project?.columnEditStatus);
  const columns = useSelector((state) => state?.project?.selectedProject?.columns);

  // eslint-disable-next-line
  const [{ isOver }, drop] = useDrop({
    accept: "task", // Specify the accepted item type here
    drop: (item) => onDrop(item.id, column._id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  //console.log("column re renders")

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event) => {
    setEditTitle(event.target.value);
  };

  const handleSave = async () => {
    const data = {
      title: editTitle,
    }
    const idObject = {
      id: id,
      columnId: column._id
    }
    dispatch(editColumnAsync({ data, idObject }))
    setTitle(editTitle);
    setIsEditing(false);
    // Here you can also add the logic to save the updated title to your backend if needed
  };

  const handleCancel = () => {
    setEditTitle(title);
    setIsEditing(false);
  };

  useEffect(() => {
    const updatedColumn = columns?.find((col) => col._id === column._id);
    if (updatedColumn) {
      setTitle(updatedColumn.title);
      setEditTitle(updatedColumn.title);
    }
  }, [columns, column._id]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>

      <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        {isEditing ? (
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <TextField
              value={editTitle}
              onChange={handleTitleChange}
              size="small"
              sx={{ flexGrow: 1, marginRight: 1 }}
            />
            {editingColumn === "pending" ? (
              <CircularProgress size={24} sx={{ margin: '0 8px' }} />
            ) : (
              <>
                <IconButton onClick={handleSave} color="primary">
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleCancel} color="secondary">
                  <CancelIcon />
                </IconButton>
              </>
            )
            }
          </Box>
        ) : (
          <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={handleTitleClick}>
            {title}
          </Typography>
        )}
        <ColumnDropdown column={column} id={id} /> {/* Replace the AddIcon with ColumnDropdown */}
      </Box>
      <Box
        ref={drop}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          minWidth: { xs: "100%", sm: "300px" },
          minHeight: { xs: "400px", sm: "600px" },
          maxWidth: { xs: "100%", sm: "300px" },
          maxHeight: { xs: "100%", sm: "600px" },
          p: 2,
          overflow: "auto", // Optional: add overflow to handle large number of tasks
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {tasks.map((task) => (
          <Task key={task._id} task={task} column={column}/>
        ))}
      </Box>
    </Box>
  );
}

export default Column;
