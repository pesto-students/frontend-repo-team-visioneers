import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

// Styled components
const StyledContainer = styled(Box)({
  display: "flex",
  minHeight: "99vh",
  justifyContent: "center", // Center the container
  alignItems: "center", // Center the container
  paddingLeft: "1rem",
  paddingRight: "1rem",
});

const Pane = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  paddingLeft: "2rem",
  paddingRight: "2rem",
  paddingBottom: "6rem", // Increase padding at the bottom to move Pane up
  color: "#000",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "80%",
    paddingLeft: "4rem",
    paddingRight: "4rem",
  },
  [theme.breakpoints.up("md")]: {
    width: "60%",
    paddingLeft: "6rem",
    paddingRight: "6rem",
  },
  [theme.breakpoints.up("lg")]: {
    width: "50%",
    paddingLeft: "8rem",
    paddingRight: "8rem",
  },
  [theme.breakpoints.up("xl")]: {
    paddingRight: "20rem",
    paddingLeft: "20rem",
  },
}));

const StyledButton = styled(Button)({
  marginTop: "1rem",
  backgroundColor: "#0b5fae",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#0b5fae",
  },
});

const NoWorkspacePage = () => {
  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate("/workspaces");
  };

  return (
    <>
      <StyledContainer>
        <Pane>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontSize: "2rem", textAlign: "center", color: "#1b7fdc" }}
          >
            It all starts with the Workspace
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: "1.5rem", textAlign: "center" }}
          >
            A Workspace is where work happens in TaskWise. You'll find your
            projects, tasks and group members here.
          </Typography>
          <StyledButton variant="contained" onClick={handleNextClick}>
            CONTINUE TO WORKSPACE
          </StyledButton>
        </Pane>
      </StyledContainer>
    </>
  );
};

export default NoWorkspacePage;
