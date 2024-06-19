import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography, Grid, Box, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProjectIconBlack from '../../assets/Projects.png';
import WorkspaceMembers from './WorkspaceMembers';
import Loading from '../../components/Loading';
import { useSelector } from 'react-redux';

const CustomBox = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 160px)',
  overflowY: 'auto',
  padding: theme.spacing(2),
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
  '-ms-overflow-style': 'none',
  'scrollbar-width': 'thin',
  'scrollbar-color': '#888 #e0e0e0',
}));

// Styled message for no projects
const NoProjectsMessage = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  fontSize: "1.5rem",
  color: theme.palette.text.secondary,
}));

function WorkspaceProjectCard({ workspace, projectData, membersData, isFilter }) {
  const navigate = useNavigate();
  const fetchWorkspaceProjectsStatus = useSelector((state) => state.workspace.fetchWorkspaceProjectsStatus);

  if(fetchWorkspaceProjectsStatus === 'loading'){
    return <Loading/>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <CustomBox>
          {projectData.length > 0 ? (
            <Grid container spacing={3}>
              {projectData.map((project) => (
                <Grid item key={project.id} xs={12} sm={6} md={4} lg={4} xl={3}>
                  <Card
                    sx={{
                      width: '100%',
                      maxWidth: 240,
                      borderRadius: 2,
                    }}
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <CardMedia
                      component="img"
                      alt="project thumbnail"
                      height="100"
                      image={project.imgUrl}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Grid container alignItems="center" spacing={0.2}>
                        <Grid item>
                          <img
                            src={ProjectIconBlack}
                            alt="Projects"
                            style={{ padding: "10px", width: "24px", height: "24px" }}
                          />
                        </Grid>
                        <Grid item sx={{ paddingTop: 2 }}>
                          <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem', wordWrap: 'break-word' }}>
                              {project.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <NoProjectsMessage>
                {isFilter && projectData.length === 0 ? (
                  <NoProjectsMessage>
                    No matching projects found
                  </NoProjectsMessage>
                ) : (
                  <NoProjectsMessage>
                    Start by adding a new project
                  </NoProjectsMessage>
                )}
            </NoProjectsMessage>
          )}
        </CustomBox>
      </Grid>
      <Grid item xs={12} md={3}>
        <WorkspaceMembers height="365px" width="90%" membersData={membersData} workspace={workspace} />
      </Grid>
    </Grid>
  );
}

WorkspaceProjectCard.propTypes = {
  projectData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string,
  })).isRequired,
  membersData: PropTypes.array.isRequired,
  workspace: PropTypes.object.isRequired,
};

export default WorkspaceProjectCard;
