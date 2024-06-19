import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

const CustomToolbar = ({ onNavigate }) => {
  return (
    <ButtonGroup sx={{justifyContent: 'center'}}>
      <Button onClick={() => onNavigate('PREV')}>Prev</Button>
      <Button onClick={() => onNavigate('TODAY')}>Today</Button>
      <Button onClick={() => onNavigate('NEXT')}>Next</Button>
    </ButtonGroup>
  );
};

export default CustomToolbar;
