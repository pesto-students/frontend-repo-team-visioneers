import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: '80vh', // Maximum height to fit most screens
  overflowY: 'auto', // Enable vertical scrolling
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const AddedMembersModal = ({ open, handleClose, isWorkspacesPage, members, id }) => {
  const navigate = useNavigate();
  const showScroll = members.length > 4;

  const handleWorkspaceDetailsClick = () => {
    navigate(`/workspaces/${id}`);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CelebrationIcon sx={{ fontSize: 28 }} />
          <Typography variant="h6" component="h2">Added people to workspace</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" gutterBottom sx={{ ml: 4 }}>
          You have added {members.length} {members.length === 1 ? 'person' : 'people'} to your workspace
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            maxHeight: showScroll ? 'calc(100% - 180px)' : 'auto', // Adjust height based on content
            overflowY: showScroll ? 'auto' : 'unset', // Enable scrolling if necessary
          }}
        >
          {members.map((member, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>{member.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={member} />
            </ListItem>
          ))}
        </Box>
        { isWorkspacesPage && id != null && (
          <Typography
            variant="body2"
            color="primary"
            onClick={handleWorkspaceDetailsClick}
            sx={{ cursor: 'pointer', mt: 2, textAlign: 'right' }}
          >
            Go to workspace details
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

AddedMembersModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.string),
};

AddedMembersModal.defaultProps = {
  members: [],
};

export default AddedMembersModal;
