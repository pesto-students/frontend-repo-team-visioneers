import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import TaskWiseLogo from "../../assets/TaskWiseLogo.png";
import confirmationlogo from "../../assets/confirmationlogo.jpeg"; // Assuming you have a different image for confirmation

const theme = createTheme();

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  marginBottom: "6rem",
  padding: theme.spacing(4),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: "#0062ff",
  height: 50,
  width: 370,
  fontSize: "1rem",
  borderRadius: "10px",
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(5),
  right: theme.spacing(18),
  fontSize: "1rem",
  color: theme.palette.grey[500],
  [theme.breakpoints.down("sm")]: {
    right: 0,
    left: 0,
    bottom: 0,
    textAlign: "center",
    padding: theme.spacing(1),
  },
}));

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/login");
    }, 2000); // Delay to show the loader for 2 seconds
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <img
          src={TaskWiseLogo}
          alt="TaskWise Logo"
          style={{
            width: 300,
            maxWidth: "80%",
            height: "auto",
            paddingBottom: "1rem",
            display: "block",
            margin: "0 auto",
          }}
        />
        <img
          src={confirmationlogo}
          alt="Confirmation Logo"
          style={{
            width: 300,
            maxWidth: "80%",
            height: "auto",
            paddingBottom: "2rem",
            display: "block",
            margin: "0 auto",
          }}
        />
        <Typography
          variant="h5"
          sx={{
            marginBottom: 2,
            textAlign: "center",
            fontWeight: "bold",
            color: "green",
          }}
        >
          PASSWORD UPDATED
        </Typography>
        <SubmitButton
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Go to Login"
          )}
        </SubmitButton>
      </Container>
      <CopyrightText>
        Copyright © 2024. TaskWise All rights reserved.
      </CopyrightText>
    </ThemeProvider>
  );
};

export default ConfirmationPage;
