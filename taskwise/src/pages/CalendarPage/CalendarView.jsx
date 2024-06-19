import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import TaskModal from '../../components/TaskModal';
import CustomToolbar from './CustomToolbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksByUserIDAsync } from '../../features/workspace/workspaceSlice';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const events = useSelector((state) => state.workspace.userTasks) || [];
  const userId = useSelector((state) => state?.user?.loggedInUser?.user?._id);
  const [selectedTask, setSelectedTask] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchTasksByUserIDAsync(userId));
    }
  }, [dispatch, userId]);

  const handleSelectEvent = (event) => {
    setSelectedTask(event);
  };

  // Function to get priority color based on priority level
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
      default:
        return "gray";
    }
  };

  // Map tasks data into events format expected by react-big-calendar
  const mappedEvents = events.map((task) => ({
    id: task.id,
    name: task.name,
    title: task.name,
    project: task.project,
    projectID: task.projectID,
    workspace: task.workspace,
    dueDate: task.dueDate,
    priority: task.priority,
    start: new Date(task.dueDate), // Convert dueDate to Date object
    end: new Date(task.dueDate), // For simplicity, set end to start date
    description: task.content,
    attachments: task.attachments,
    createdBy: task.createdBy,
    assigneeUserID: task.assigneeUserID,
    comments: task.comments,
  }));

  // Function to provide custom styles to each event
  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = getPriorityColor(event.priority);

    const style = {
      backgroundColor: backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: 'none',
      display: 'block',
      textAlign: 'left'
    };

    return {
      style: style
    };
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={mappedEvents} // Use mappedEvents instead of original events
        startAccessor="start"
        endAccessor="end"
        style={{ margin: 'auto' }}
        onSelectEvent={handleSelectEvent}
        selectable
        eventPropGetter={eventStyleGetter}
        components={{
          toolbar: CustomToolbar, // Use the custom toolbar
          eventWrapper: ({ event, children }) => {
            const tasksOnDate = events.filter(
              (e) =>
                moment(e.start).isSame(event.start, 'day') &&
                moment(e.end).isSame(event.end, 'day')
            );

            if (tasksOnDate.length > 1) {
              return (
                <div className="calendar-cell-multiple-tasks" onClick={(e) => {
                  e.preventDefault(); // Prevent calendar default click behavior
                }}>
                  {children}
                </div>
              );
            }

            return children;
          },
        }}
      />

      <TaskModal
        open={Boolean(selectedTask)}
        handleClose={() => setSelectedTask(null)}
        task={selectedTask}
      />
    </div>
  );
};

export default CalendarView;
