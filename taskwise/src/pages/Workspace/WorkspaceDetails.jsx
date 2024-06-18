// WorkspaceDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography, InputBase, Divider, Tabs, Tab, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Modal from "@mui/material/Modal";
import WorkspaceTasks from './WorkspaceTasks';
import WorkspaceSettings from './WorkspaceSettings';
import WorkspaceProjectCard from './WorkspaceProjectCard';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchWorkspaceByIdAsync,
  fetchWorkspaceProjectsAsync,
  fetchWorkspaceMembersAsync
} from '../../features/workspace/workspaceSlice';
import {
  resetProjectAddStatus,
} from "../../features/project/projectSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewWorkspaceProjectModel from './Models/NewWorkspaceProjectModel';
import Loading from '../../components/Loading';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f0f0f0",
  marginLeft: 0,
  width: '200px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  transition: theme.transitions.create('width'),
  '&:focus-within': {
    width: '300px',
  },
}));

const CustomBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'calc(100vh - 160px)',
  overflowY: 'auto',
  padding: theme.spacing(2),
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '-ms-overflow-style': 'none',
  'scrollbar-width': 'none',
}));

function WorkspaceDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const workspace = useSelector((state) => state.workspace.selectedWorkspace);
  const projectData = useSelector((state) => state.workspace.selectedProjects);
  const membersData = useSelector((state) => state.workspace.selectedMembers);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilter, setIsFilter] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setIsFilter(true);
  };
  
  const filteredProjects = projectData.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const projectAddStatus = useSelector(
    (state) => state.project.projectAddStatus
  );

  useEffect(() => {
    if (projectAddStatus === "fulfilled") {
      toast.success("Project created successfully!");
      dispatch(resetProjectAddStatus());
    }
    if(projectAddStatus==="rejected"){
      toast.error("Project not added!");
      dispatch(resetProjectAddStatus());
    }
    // eslint-disable-next-line
  }, [projectAddStatus]);

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchWorkspaceByIdAsync(id));
      dispatch(fetchWorkspaceProjectsAsync(id));
      dispatch(fetchWorkspaceMembersAsync(id));
    }
  }, [dispatch, id]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSearchQuery(""); // Clear search input when tab changes
    dispatch(fetchWorkspaceByIdAsync(id));
  };

  const handleProjectCreated = () => {
    dispatch(fetchWorkspaceProjectsAsync(id));
    setSelectedTab(0); // Change to "Projects" tab after creating a project
  };

  if (!workspace) {
    return <Loading/>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': {
          m: 1,
          width: '100%',
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: 120,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <ToastContainer />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={workspace.imgUrl} alt="Workspace"
                 style={{ borderRadius: '8px', width: '50px', height: "44px", padding: "12px" }} />
            <Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ pt: 1, fontSize: '0.8rem' }}>
                  Workspace / <strong>Details</strong>
                </Typography>
                <Box>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                    {workspace.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pr: 2, p: 2 }}>
            {selectedTab === 0 && (
              <Search sx={{ mb: 1 }}>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: 'gray' }} />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search projects…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
              </Search>
            )}
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Tabs value={selectedTab} onChange={handleTabChange} aria-label="workspace tabs">
            <Tab
              label={
                <Typography sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                  Projects
                </Typography>
              }
            />
            <Tab
              label={
                <Typography sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                  Tasks
                </Typography>
              }
            />
            <Tab
              label={
                <Typography sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                  Settings
                </Typography>
              }
            />
          </Tabs>
          <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ fontSize: '0.70rem', padding: '4px 8px', mr: 2 }}
              onClick={handleOpenModal}
            >
              New Project
            </Button>
        </Box>
      </Paper>
      <CustomBox>
        {selectedTab === 0 && <WorkspaceProjectCard workspace={workspace} projectData={filteredProjects} membersData={membersData} isFilter={isFilter} />}
        {selectedTab === 1 && <WorkspaceTasks workspace={workspace} />}
        {selectedTab === 2 && <WorkspaceSettings workspace={workspace}/>}
      </CustomBox>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box>
          <NewWorkspaceProjectModel handleClose={handleCloseModal} workspace={workspace} onProjectCreated={handleProjectCreated} />
        </Box>
      </Modal>
    </Box>
  );
}

export default WorkspaceDetails;
