import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import TaskWiseLogo from "../../assets/TaskWiseLogo.png";
import forgotpasswordlogo from "../../assets/forgotpasswordlogo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPasswordAsync,
  resetForgotPasswordStatus,
  clearForgotPasswordError,
} from "../../features/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed", // Change to 'fixed'
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  marginBottom: "6rem",
  padding: theme.spacing(4),
}));

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: 400, // Adjust width as needed for responsiveness
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
});

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: "left", // Align text to the left
  fontWeight: "bold", // Make the text bold
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#0062ff",
  height: 50,
  fontSize: "1rem",
  borderRadius: "10px",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    // Target the root of the outlined input
    borderRadius: 10,
    backgroundColor: "#f6f6f6",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    "&.Mui-focused fieldset": {
      borderColor: "#80bdff",
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.grey[500], // Placeholder color
    "&.Mui-focused": {
      color: "#80bdff",
    },
  },
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(5), // Adjust bottom spacing as needed
  right: theme.spacing(18), // Adjust right spacing as needed
  fontSize: "1rem", // Adjust font size
  color: theme.palette.grey[500], // Or any suitable color
  [theme.breakpoints.down("sm")]: {
    // Responsive adjustment for small screens
    right: 0, // Align to the right edge
    left: 0, // Align to the left edge (for centering)
    bottom: 0, // Stick to the bottom
    textAlign: "center",
    padding: theme.spacing(1), // Add padding for better visibility
  },
}));

// const Footer = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   right: 0,
//   padding: theme.spacing(2),
//   textAlign: "center",
//   backgroundColor: theme.palette.grey[200], // Or any suitable color
// }));

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState(""); // State for email
  const [error, setError] = useState(""); // State for error message
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const successMessage = useSelector((state) => state.user.successMessage);
  // const forgotPasswordError = useSelector(
  //   (state) => state.user.forgotPasswordError
  // );

  const forgotPasswordStatus = useSelector(
    (state) => state.user.forgotPasswordStatus
  );
  const forgotPasswordError = useSelector(
    (state) => state.user.forgotPasswordError
  );

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!email.trim()) {
      setError("Please enter your Email ID");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a correct email");
      return;
    }

    setError(""); // Clear any previous error
    setLoading(true);
    dispatch(forgotPasswordAsync({ email }));
    setIsButtonDisabled(true);
  };

  useEffect(() => {
    if (forgotPasswordStatus === "fulfilled") {
      navigate("/verification");
      dispatch(resetForgotPasswordStatus());
    }
  }, [forgotPasswordStatus, navigate, dispatch]);

  useEffect(() => {
    if (forgotPasswordError) {
      toast.error(forgotPasswordError.message, {
        onClose: () => {
          setLoading(false);
          setIsButtonDisabled(false);
          dispatch(clearForgotPasswordError());
          dispatch(resetForgotPasswordStatus());
        },
      });
    }
  }, [forgotPasswordError, dispatch]);

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
            paddingBottom: "2.5rem",
            display: "block", // Make the image a block element
            margin: "0 auto", // Center it horizontally
          }}
        />
        <img
          src={forgotpasswordlogo}
          alt="Forgot Password Logo"
          style={{
            width: 300,
            maxWidth: "80%",
            height: "auto",
            paddingBottom: "2rem",
            display: "block", // Make the image a block element
            margin: "0 auto", // Center it horizontally
          }}
        />
        <Box
          sx={{
            width: 400,
            textAlign: "left",
            [theme.breakpoints.down("sm")]: {
              // Apply styles for smaller screens
              width: "100%", // Full width
              textAlign: "center", // Center alignment
            },
          }}
        >
          <Title variant="h5">Forgot Password?</Title>
        </Box>

        <Form>
          <Typography variant="body2" sx={{ color: "#5b5858" }}>
            Don't worry! It happens. Please enter your email id, we will send
            the OTP
          </Typography>

          <StyledTextField
            label="Enter your Email ID"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Handle changes
            error={!!error} // Show error border if there's an error
            helperText={error} // Display error message
          />

          <SubmitButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Continue"
            )}
          </SubmitButton>
        </Form>
      </Container>
      <CopyrightText>
        Copyright © 2024. TaskWise All rights reserved.
      </CopyrightText>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default ForgotPasswordPage;
