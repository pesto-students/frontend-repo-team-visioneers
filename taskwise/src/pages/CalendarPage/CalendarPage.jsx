import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CalendarView from './CalendarView';
import { fetchTasksByUserIDAsync } from '../../features/workspace/workspaceSlice';
import { fetchProjectAsync } from '../../features/project/projectSlice';

const CustomBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  overflowY: 'auto',
  padding: theme.spacing(2),
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
  '-ms-overflow-style': 'none',
  'scrollbar-width': 'thin',
  'scrollbar-color': '#888 #e0e0e0',
}));

function CalendarPage() {
  const userTasksData = useSelector((state) => state.workspace.userTasks) || [];
  const userId = useSelector((state) => state?.user?.loggedInUser?.user?._id);
  const [selectedProject, setSelectedProject] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const dispatch = useDispatch();

  const handleProjectChange = (event) => {
    const projectId = event.target.value;
    const project = projects.find(p => p.id === projectId);
    const projectName = project ? project.name : '';

    setSelectedProject(projectId);
    filterTasksByProject(projectId);
    
    if (userId) {
      dispatch(fetchTasksByUserIDAsync({ userId, projectName }));
    }
  };

  const projects = useSelector((state) => state.project.projects) || [];

  const filterTasksByProject = (projectId) => {
    let tasksToFilter = userTasksData;
    if (projectId !== '') {
      tasksToFilter = userTasksData.filter(task => task.project === projectId);
    }

    const formattedTasks = tasksToFilter.map(task => ({
      title: task.name,
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      id: task.id,
    }));

    setFilteredTasks(formattedTasks);
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchTasksByUserIDAsync({ userId, projectName: '' }));
      dispatch(fetchProjectAsync(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    filterTasksByProject(selectedProject);
  }, [userTasksData, selectedProject]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': {
          m: 1,
          width: '100%',
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: 'auto',
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
          <Grid item>
            <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
              Calendar
            </Typography>
          </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
            <Select
              value={selectedProject}
              onChange={handleProjectChange}
              displayEmpty
              sx={{ minWidth: 130, height: 30 }}
            >
              <MenuItem value="">
                <em>All Projects</em>
              </MenuItem>
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Paper>
      <CustomBox>
        <Paper elevation={3} sx={{ height: '100%' }}>
          <CalendarView events={filteredTasks} />
        </Paper>
      </CustomBox>
    </Box>
  );
}

export default CalendarPage;
