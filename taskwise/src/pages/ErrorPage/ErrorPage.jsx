import React from "react";
import { Typography, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 100, mb: 2 }} />
      <Typography variant="h2" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        It might have been removed, or you may have mistyped the URL.
      </Typography>
    </Container>
  );
};

export default ErrorPage;
