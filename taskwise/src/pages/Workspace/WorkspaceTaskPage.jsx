import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { styled } from "@mui/material/styles";
import { format } from 'date-fns';
import TaskModal from "../../components/TaskModal";
import {
  fetchWorkspaceTasksAsync,
  fetchWorkspaceMembersAsync
} from '../../features/workspace/workspaceSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../../components/Loading";

// Register the necessary modules with AG Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Styled container for the AG Grid
const StyledAgGridContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
}));

// Styled message for no tasks
const NoTasksMessage = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  fontSize: "1.5rem",
  color: theme.palette.text.secondary,
}));

// Main component to display the tasks data
const WorkspaceTaskPage = () => {
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const tasksData = useSelector((state) => state.workspace.selectedTasks);
  const workspace = useSelector((state) => state.workspace.selectedWorkspace);
  const fetchWorkspaceTasksStatus = useSelector((state) => state.workspace.fetchWorkspaceTasksStatus); // Fetching status from state
  const dispatch = useDispatch();

  useEffect(() => {
    if (workspace.id) {
      dispatch(fetchWorkspaceTasksAsync(workspace.id));
      dispatch(fetchWorkspaceMembersAsync(workspace.id));
    }
  }, [dispatch, workspace.id]);

  const handleTaskItemClick = useCallback((params) => {
    setSelectedTask(params.data);
    setModalOpen(true);
  }, []);

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const [colDefs] = useState([
    { 
      field: "name", 
      headerName: "Task", 
      flex: 1, 
      sortable: true, 
      filter: "agTextColumnFilter" 
    },
    { 
      field: "dueDate", 
      headerName: "Due Date", 
      flex: 1, 
      sortable: true, 
      filter: "agTextColumnFilter",
      valueFormatter: params => formatDate(params.value) 
    },
    { 
      field: "priority", 
      headerName: "Priority", 
      flex: 1, 
      sortable: true, 
      filter: "agTextColumnFilter" 
    },
    { 
      field: "project", 
      headerName: "Project", 
      flex: 1, 
      sortable: true, 
      filter: "agTextColumnFilter" 
    },
    { 
      field: "assigneeUserID.email", 
      headerName: "AssignedTo", 
      flex: 1, 
      sortable: true, 
      filter: "agTextColumnFilter" 
    },
    // { 
    //   field: "createdBy.username", 
    //   headerName: "CreatedBy", 
    //   flex: 1, 
    //   sortable: true, 
    //   filter: "agTextColumnFilter" 
    // },
  ]);

  const formatDate = (dateString) => {
    if (!dateString) return ''; 
    const date = new Date(dateString);
    return format(date, 'dd MMM yy'); 
  };
  
  const defaultColDef = useMemo(() => ({
    filter: true,
    floatingFilter: true,
    resizable: true,
    minWidth: 100,
  }), []);

  const rowData = useMemo(() => tasksData, [tasksData]);
  const gridKey = useMemo(() => `grid-${tasksData.length}`, [tasksData]);

  return (
    <StyledAgGridContainer>
      {fetchWorkspaceTasksStatus === 'loading' ? (
        <Loading/>
      ) : rowData && rowData.length > 0 ? (
        <div className="ag-theme-alpine" style={gridStyle}>
          <AgGridReact
            key={gridKey}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            suppressRowClickSelection={true}
            onRowClicked={handleTaskItemClick}
          />
        </div>
      ) : (
        <NoTasksMessage>There are no tasks on your list at this moment</NoTasksMessage>
      )}
      {selectedTask && (
        <TaskModal
          open={modalOpen}
          handleClose={handleModalClose}
          task={selectedTask}
          workspaceID={workspace?.id}
        />
      )}
    </StyledAgGridContainer>
  );
};

export default WorkspaceTaskPage;
