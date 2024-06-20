import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import WorkspaceIconBlack from "../../assets/WorkspaceIconBlack.png";

function WorkspaceCard({ workspace, onClick }) {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 240,
        borderRadius: 2,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        alt="workspace thumbnail"
        height="100"
        image={workspace.imgUrl}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Grid container alignItems="center" spacing={0.2}>
          <Grid item>
            <img
              src={WorkspaceIconBlack}
              alt="Workspaces"
              style={{ padding: "10px", width: "24px", height: "24px" }}
            />
          </Grid>
          <Grid item sx={{ paddingTop: 2 }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontSize: "1rem", wordWrap: "break-word" }}
            >
              {workspace.name}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default WorkspaceCard;
