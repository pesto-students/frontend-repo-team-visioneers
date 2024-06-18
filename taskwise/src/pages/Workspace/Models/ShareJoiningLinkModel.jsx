import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, IconButton, Modal, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkSharpIcon from '@mui/icons-material/LinkSharp';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  borderRadius: 4,
  p: 3,
};

const ShareJoiningLinkModal = ({ handleClose }) => {
  const handleCopy = () => {
    // Logic to copy the link
  };

  return (
    <Modal open onClose={handleClose}>
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', flexGrow: 1 }}>
            Share Joining Link
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Share this link via:
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FacebookIcon sx={{ mr: 1, color: '#3b5998', fontSize: 30 }} />
          <WhatsAppIcon sx={{ mr: 1, color: '#25D366', fontSize: 30 }} />
          <TelegramIcon sx={{ mr: 1, color: '#0088cc', fontSize: 30 }} />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LinkSharpIcon sx={{ mr: 1, transform: 'rotate(135deg)', fontSize: 30 }} />
          <Typography variant="body2" sx={{ fontSize: 14, color: 'gray', flexGrow: 1 }}>
            https://dev--devtaskwisefrontend.netlify.app
          </Typography>
          <Button 
            variant="contained"
            color="primary"
            sx={{ ml: 1, textTransform: 'none' }}
            onClick={handleCopy}
          >
            Copy
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ShareJoiningLinkModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default ShareJoiningLinkModal;
