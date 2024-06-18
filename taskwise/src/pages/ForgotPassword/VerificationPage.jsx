import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import TaskWiseLogo from "../../assets/TaskWiseLogo.png";
import verificationlogo from "../../assets/verificationlogo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyResetCodeAsync,
  resetVerifyCodeStatus,
  resendOTPAsync,
  resetResendOTPStatus,
  clearVerifyCodeError,
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

const OtpContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: 350,
}));

const OtpInput = styled(TextField)({
  width: "60px",
  height: "60px",
  textAlign: "center",
  fontSize: "2rem", // Adjust font size as needed
  marginRight: "8px",
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
  },
  "& fieldset": {
    border: "1px solid #e0e0e0",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.05)",
  },
  "& .MuiInputBase-input": {
    fontWeight: "bold",
  },
  "&.Mui-focused fieldset": {
    borderColor: "#80bdff",
  },
});

const ImageContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: "center",
  fontWeight: "bold",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: "#0062ff",
  height: 50,
  width: 370,
  fontSize: "1rem",
  borderRadius: "10px",
}));

const ResendLink = styled(Link)({
  // marginTop: theme.spacing(2),
  cursor: "pointer",
  color: "#0062ff",
  paddingLeft: "8px",
});

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

const VerificationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const verifyCodeStatus = useSelector((state) => state.user.verifyCodeStatus);
  const verifyCodeError = useSelector((state) => state.user.verifyCodeError);
  const resetEmail = useSelector((state) => state.user.resetEmail);

  const resendOTPStatus = useSelector((state) => state.user.resendOTPStatus);
  const resendOTPError = useSelector((state) => state.user.resendOTPError);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (otp.includes("")) {
      setError("Please enter the full OTP");
      return;
    }

    setError("");
    setLoading(true);
    dispatch(verifyResetCodeAsync({ email: resetEmail, code }));
    setIsButtonDisabled(true);
  };

  // Function to mask email
  const maskEmail = (email) => {
    const [username, domain] = email.split("@");
    const maskedUsername =
      username.slice(0, 2) + "*".repeat(username.length - 2);
    return maskedUsername + "@" + domain;
  };

  const handleOtpChange = (index, value) => {
    // Update OTP state
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if not the last
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleResendOTP = () => {
    dispatch(resendOTPAsync({ email: resetEmail }));
  };

  useEffect(() => {
    if (verifyCodeStatus === "fulfilled") {
      navigate("/resetpassword", {
        state: { email: resetEmail, code: otp.join("") },
      });
      dispatch(resetVerifyCodeStatus());
    }
  }, [verifyCodeStatus, navigate, dispatch, resetEmail, otp]);

  useEffect(() => {
    if (verifyCodeError) {
      toast.error(verifyCodeError.message, {
        onClose: () => {
          setLoading(false);
          setIsButtonDisabled(false);
          dispatch(clearVerifyCodeError());
          dispatch(resetVerifyCodeStatus());
        },
      });
    }
  }, [verifyCodeError, dispatch]);

  useEffect(() => {
    if (resendOTPStatus === "fulfilled") {
      toast.success("OTP has been resent to your email");
      dispatch(resetResendOTPStatus());
    } else if (resendOTPStatus === "rejected") {
      toast.error(resendOTPError.message);
      dispatch(resetResendOTPStatus());
    }
  }, [resendOTPStatus, resendOTPError, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ImageContainer>
          <img
            src={TaskWiseLogo}
            alt="TaskWise Logo"
            style={{
              width: 300,
              maxWidth: "80%",
              height: "auto",
              // paddingBottom: "0rem",
              display: "block",
              margin: "0 auto",
            }}
          />
          <img
            src={verificationlogo}
            alt="Verification Logo"
            style={{
              width: 300,
              maxWidth: "80%",
              height: "auto",
              paddingBottom: "1rem",
              display: "block",
              margin: "0 auto",
            }}
          />
        </ImageContainer>

        <Title variant="h5">OTP VERIFICATION</Title>

        <Typography
          variant="body2"
          sx={{ color: "#5b5858", marginBottom: "1.5rem" }}
        >
          Enter the OTP sent to{" "}
          {resetEmail ? maskEmail(resetEmail) : "your email"}
        </Typography>

        <OtpContainer>
          {otp.map((digit, index) => (
            <OtpInput
              key={index}
              id={`otp-input-${index}`}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              inputProps={{ maxLength: 1 }}
              variant="outlined"
              error={!!error && otp.includes("")}
              // helperText={!!error && otp.includes("") ? error : ""}
            />
          ))}
        </OtpContainer>

        {/* <Typography
          variant="body2"
          sx={{ color: "#5b5858", marginTop: "1.5rem" }}
        >
          00:120 Sec
        </Typography> */}

        <Box sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}>
          <Typography variant="body2" sx={{ color: "#5b5858" }}>
            Didn't receive code?
          </Typography>
          <ResendLink onClick={handleResendOTP} variant="body2">
            Re-send
          </ResendLink>
        </Box>

        <SubmitButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isButtonDisabled}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
        </SubmitButton>

        <CopyrightText>
          Copyright © 2024. TaskWise All rights reserved.
        </CopyrightText>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default VerificationPage;
