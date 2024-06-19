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

  const mappedEvents = events.map((task) => ({
    id: task.id,
    name: task.name,
    title: task.name,
    project: task.project,
    projectID: task.projectID,
    workspace: task.workspace,
    dueDate: task.dueDate,
    priority: task.priority,
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    description: task.content,
    attachments: task.attachments,
    createdBy: task.createdBy,
    assigneeUserID: task.assigneeUserID,
    comments: task.comments,
  }));

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

  const Event = ({ event }) => (
    <div className="rbc-event-content">
      <span
        onClick={(e) => {
          e.stopPropagation(); // Stop the event from propagating to the calendar cell
          handleSelectEvent(event);
        }}
      >
        {event.title}
      </span>
    </div>
  );

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={mappedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: 'auto' }}
        onSelectEvent={handleSelectEvent}
        selectable
        eventPropGetter={eventStyleGetter}
        components={{
          toolbar: CustomToolbar,
          event: Event, // Use the custom Event component
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
