import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TaskPage from './TaskPage';

const CustomBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'calc(100vh - 100px)',
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

function MyTaskPage() {
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
              My Tasks
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <CustomBox>
        <Paper elevation={3} sx={{ height: '100%' }}>
          <TaskPage/>
        </Paper>
      </CustomBox>
    </Box>
  );
}

export default MyTaskPage;
