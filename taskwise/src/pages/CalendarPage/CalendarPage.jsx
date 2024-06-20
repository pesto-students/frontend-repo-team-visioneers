import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import CalendarView from './CalendarView';

const CustomBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  overflowY: 'auto',
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

  return (
  <CustomBox>
    <Paper elevation={3} sx={{ height: '100%' }}>
      <CalendarView />
    </Paper>
  </CustomBox>
  );
}

export default CalendarPage;
