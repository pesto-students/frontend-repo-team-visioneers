import React, { useState, useEffect } from "react";
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
  resetPasswordAsync,
  resetResetPasswordStatus,
  clearResetPasswordError,
} from "../../features/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import Joi from "joi";

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

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: 400,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
});

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#0062ff",
  height: 50,
  fontSize: "1rem",
  borderRadius: "10px",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    backgroundColor: "#f6f6f6",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    "&.Mui-focused fieldset": {
      borderColor: "#80bdff",
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.grey[500],
    "&.Mui-focused": {
      color: "#80bdff",
    },
  },
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

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const resetPasswordStatus = useSelector(
    (state) => state.user.resetPasswordStatus
  );
  const resetPasswordError = useSelector(
    (state) => state.user.resetPasswordError
  );

  const [checkPassword, setCheckPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({}); // State for error messages
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const { email, code } = location.state || {};

  const schema = Joi.object({
    checkPassword: Joi.string()
      .pattern(
        new RegExp(
          "^[a-zA-Z0-9!@#\\$%\\^&\\*\\(\\)_\\+\\-=[\\]{};:'\",<>\\.\\?/`~]{7,}$"
        )
      )
      .required()
      .messages({
        "string.empty": "Please fill out both password fields",
        "string.pattern.base":
          "Password must be at least 7 characters and contain only letters, numbers, and special characters",
      }),
    confirmPassword: Joi.any()
      .valid(Joi.ref("checkPassword"))
      .required()
      .messages({
        "any.only": "Passwords do not match",
        "any.required": "Please fill out both password fields",
      }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { error } = schema.validate(
      { checkPassword, confirmPassword },
      { abortEarly: false }
    );

    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    const newPassword = checkPassword;
    dispatch(resetPasswordAsync({ email, code, newPassword }));
    setIsButtonDisabled(true);
  };

  useEffect(() => {
    if (resetPasswordStatus === "fulfilled") {
      navigate("/confirmation");
      dispatch(resetResetPasswordStatus());
    }
  }, [resetPasswordStatus, navigate, dispatch]);

  useEffect(() => {
    if (resetPasswordError) {
      toast.error(resetPasswordError.message, {
        onClose: () => {
          setLoading(false);
          setIsButtonDisabled(false);
          dispatch(clearResetPasswordError());
          dispatch(resetResetPasswordStatus());
        },
      });
    }
  }, [resetPasswordError, dispatch]);

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
        <Typography
          variant="h5"
          sx={{ marginBottom: 2, textAlign: "center", fontWeight: "bold" }}
        >
          Reset Password...
        </Typography>
        <Form>
          <StyledTextField
            label="Check Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
            error={!!errors.checkPassword}
            helperText={errors.checkPassword}
          />
          <StyledTextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
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
              "Update"
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

export default ResetPasswordPage;
