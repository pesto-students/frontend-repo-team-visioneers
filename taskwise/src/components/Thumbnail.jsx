import React from 'react';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Thumbnail = ({ selectedImage, handleFileUploadClick, width, height }) => {
  return (
    <Box
      sx={{
        borderRadius: '8px',
        border: '1px none gray',
        width: width, // Use width prop
        height: height, // Use height prop
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: selectedImage ? 'transparent' : '#EDEDED',
      }}
      onClick={handleFileUploadClick}
    >
      {selectedImage ? (
        <img src={selectedImage} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <AddCircleOutlineIcon fontSize="large" sx={{ color: 'gray', fontSize: 30 }} />
      )}
    </Box>
  );
};

export default Thumbnail;
