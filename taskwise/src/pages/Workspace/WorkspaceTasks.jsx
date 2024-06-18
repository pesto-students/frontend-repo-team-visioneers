import React from 'react';
import { Grid, Paper } from '@mui/material';
import WorkspaceMembers from './WorkspaceMembers';
import WorkspaceTaskPage from './WorkspaceTaskPage';

function WorkspaceTasks() {
  return (
    <Grid container spacing={2} sx={{ height: '100%' }}>
      <Grid item xs={12} md={9} sx={{ height: '100%' }}>
        <Paper elevation={3} sx={{ height: '100%' }}>
          <WorkspaceTaskPage/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3} sx={{ height: '100%' }}>
        <Paper elevation={3} sx={{ height: '97%' }}>
          <WorkspaceMembers height="95%" width="90%"/>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default WorkspaceTasks;
