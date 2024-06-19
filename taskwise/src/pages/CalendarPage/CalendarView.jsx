import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Dialog, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import TaskModal from '../../components/TaskModal';

const localizer = momentLocalizer(moment);

const CalendarView = ({ events }) => {
  const [openTaskList, setOpenTaskList] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedTask(event);
  };

  const handleSelectSlot = (slotInfo) => {
    const tasksOnDate = events.filter(
      (event) =>
        moment(event.start).isSame(slotInfo.start, 'day') &&
        moment(event.end).isSame(slotInfo.end, 'day')
    );

    if (tasksOnDate.length > 1) {
      setSelectedTasks(tasksOnDate);
      setOpenTaskList(true);
    } else if (tasksOnDate.length === 1) {
      setSelectedTask(tasksOnDate[0]);
    }
  };

  const handleCloseTaskList = () => {
    setOpenTaskList(false);
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: 'auto' }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
      />

      <Dialog open={openTaskList} onClose={handleCloseTaskList}>
        <DialogTitle>Tasks</DialogTitle>
        <List>
          {selectedTasks.map((task) => (
            <ListItem onClick={() => setSelectedTask(task)} key={task.id}>
              <ListItemText primary={task.title} />
            </ListItem>
          ))}
        </List>
      </Dialog>

      <TaskModal
        open={Boolean(selectedTask)}
        handleClose={() => setSelectedTask(null)}
        task={selectedTask}
      />
    </div>
  );
};

export default CalendarView;
