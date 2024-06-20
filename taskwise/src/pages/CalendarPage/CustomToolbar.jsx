import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const CustomToolbar = ({ label, onNavigate }) => {
  const navigate = (action) => {
    switch (action) {
      case 'PREV':
        onNavigate('PREV');
        break;
      case 'TODAY':
        onNavigate('TODAY');
        break;
      case 'NEXT':
        onNavigate('NEXT');
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
      <div style={{ flex: 1, textAlign: 'left', cursor: 'pointer' }} onClick={() => onNavigate('TODAY')}>
        <span style={{ fontWeight: 'bold' }}>{label}</span>
      </div>
      <ButtonGroup variant="text">
        <Button onClick={() => navigate('PREV')} startIcon={<NavigateBeforeIcon />}></Button>
        <Button onClick={() => navigate('TODAY')} >Today</Button>
        <Button onClick={() => navigate('NEXT')} endIcon={<NavigateNextIcon />}></Button>
      </ButtonGroup>
    </div>
  );
};

export default CustomToolbar;
