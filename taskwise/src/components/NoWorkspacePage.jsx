import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

// Styled components
const StyledContainer = styled(Box)({
  display: "flex",
  minHeight: "99vh",
  padding: "0",
  width: "99.1vw",
});

const Pane = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  backgroundColor: "#f0f0f0",
  paddingBottom: "5rem",
  paddingLeft: "22rem",
  color: "#000",
});

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
          <Typography variant="h4" gutterBottom sx={{ fontSize: "2rem" }}>
            It all starts with the Workspace
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ fontSize: "1.5rem" }}>
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
