import React from "react";
import { Typography, Tooltip, CardMedia } from "@mui/material";
import { useDrag } from "react-dnd";
import { Card, CardContent, Chip, Box } from "@mui/material";
import { DateRange, AttachFile } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";


function Task({ task, column }) {
  const navigate = useNavigate();
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { id: task?._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  console.log(column, "column task")
  let formattedDate;
  if (task?.dueDate) {
    try {
      formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(new Date(task.dueDate));
    } catch (error) {
      console.error('Invalid date format:', task.dueDate);
      formattedDate = 'Invalid date';
    }
  } else {
    formattedDate = 'No due date';
  }

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  const handleCardClick = (e) => {
    // Only navigate if the click target is not the dropdown button
    if (e.target.closest(".dropdown")) {
      return;
    }
    navigate(`/tasks/${task._id}`);
  };

  const getChipProps = (priority) => {
    switch (priority) {
      case "High":
        return {
          label: "High",
          sx: {
            backgroundColor: "#F1CFc5",
            color: "#F93E3E",
          },
        };
      case "Medium":
        return {
          label: "Medium",
          sx: {
            backgroundColor: "#FFF3E9",
            color: "#FD973C",
          },
        };
      case "Low":
      default:
        return {
          label: "Low",
          sx: {
            backgroundColor: "#E6F8F3",
            color: "#18BB90",
          },
        };
    }
  };

  const chipProps = getChipProps(task?.priority);

  return (
    <Box>
      <Card
        sx={{
          maxWidth: "300px", // Set max width
          minWidth: "250px", // Set min width
          maxHeight: "400px", // Set max height
          minHeight: "100px", // Set min height
          pl: 2,
          pr: 2,
          borderRadius: 3,
        }}
        ref={drag} // Attach the drag source ref to the Card component
        style={{ cursor: "pointer", opacity: isDragging ? 0 : 1 }}
        className="draggable-item"
        onClick={handleCardClick}
      >
        <CardContent sx={{ p: "0.5rem" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Chip
              label={chipProps.label}
              color={chipProps.color}
              size="small"
              sx={{
                fontSize: "0.85rem", height: "20px", ...chipProps.sx,
                p: 1.4,borderRadius: 1,
              }}
            />
            <Box className="dropdown" onClick={handleDropdownClick}>
              <Dropdown columnId={column?._id} task={task} />
            </Box>
          </Box>
          <Typography variant="h6" component="div" sx={{ fontSize: "1.2rem" , mb:1}}>
            {task.taskName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.9rem", mb:3 }}
          >
            {task.content}
          </Typography>
          {task?.attachments?.length === 0 ? (
            ""
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              {task?.attachments?.slice(0, 2).map((eachUrl) => (
                <CardMedia
                  component="img"
                  alt="Task image"
                  height="100"
                  image={eachUrl?.docUrl}
                  sx={{ borderRadius: 3, width: "50%" }}
                />
              ))}
            </Box>
          )}
          <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={2}>
            <Tooltip title="Due Date">
              <Box display="flex" alignItems="center">
                <DateRange sx={{ fontSize: "0.75rem" }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  ml={0.5}
                  sx={{ fontSize: "0.7rem" }}
                >
                  {formattedDate}
                </Typography>
              </Box>
            </Tooltip>
            <Box display="flex" alignItems="center">
              <AttachFile sx={{ fontSize: "0.75rem" }} />
              <Typography
                variant="body2"
                color="text.secondary"
                ml={0.5}
                sx={{ fontSize: "0.7rem" }}
              >
                {task.attachments?.length || 0}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Task;
