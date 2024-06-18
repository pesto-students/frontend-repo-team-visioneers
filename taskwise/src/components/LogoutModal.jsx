import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px none #000",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const LogoutModal = ({ handleClose, handleLogout }) => {
  return (
    <Box sx={style}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: "10px",
          marginTop: "-19px", // Adjust margin to move the icon up
          marginRight: "-19px", // Adjust margin to move the icon to the right
        }}
      >
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography
        id="logout-text"
        variant="body1"
        style={{ marginBottom: "20px", textAlign: "center" }}
      >
        Are you sure you want to logout?
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#e0e0e0", // Light grey background
            color: "black", // Black text color
            minWidth: "80px", // Minimum width for the button
            padding: "5px 10px", // Padding
            borderRadius: "8px", // Border radius
            textTransform: "none", // Ensure the text is not all uppercase
            "&:hover": {
              backgroundColor: "#d0d0d0", // Slightly darker grey on hover
            },
          }}
          onClick={handleLogout}
        >
          Yes
        </Button>
        <Button
          sx={{
            backgroundColor: "#0b5fae",
            color: "white",
            minWidth: "80px",
            padding: "5px 10px",
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#0a54a0",
            },
          }}
          onClick={handleClose}
        >
          No
        </Button>
      </Box>
    </Box>
  );
};

LogoutModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default LogoutModal;
