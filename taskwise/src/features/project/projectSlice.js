import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWorkspaceMembers, fetchProjects, fetchProjectById, addProject, addTask, moveTask, addColumn, editColumn, editTask, columnOrderChange, deactivateTask , createProjectAI} from "./projectApi";


const initialState = {
    projects: [],
    projectFetchStatus: 'idle',
    projectAddStatus: "idle",
    selectedProject: null,
    status: "idle",
    errors: null,
    sucessMessage: null,
    taskAddStatus: "idle",
    taskMoveStatus: "idle",
    columnAddStatus: "idle",
    columnEditStatus: "idle",
    taskEditStatus: "idle",
    workspaceMembers: null,
    workspaceMembersFetchStatus: "idle",
    columnorderChangeStatus: "idle",
    taskDeleteStatus: "idle"
}

export const fetchProjectAsync = createAsyncThunk("projects/fetchProjects", async (userId) => {
    const projects = await fetchProjects(userId);
    return projects
});

export const fetchProjectByIdAsync = createAsyncThunk("projects/fetchProjectsById", async (id) => {
    const selectedProject = await fetchProjectById(id);
    return selectedProject
})

export const addProjectAsync = createAsyncThunk("projects/addProjectAsync", async (data) => {
    const addedProject = await addProject(data)
    return addedProject
})

export const addTaskAsync = createAsyncThunk("projects/addTaskAsync", async ({ task, id }) => {
    const addedTask = await addTask(task, id)
    return addedTask
})

export const moveTaskAsync = createAsyncThunk("projects/moveTaskAsync", async ({ data, idObject }) => {
    const movedTask = await moveTask(data, idObject)
    return movedTask
})

export const addColumnAsync = createAsyncThunk("projects/addColumnAsync", async ({ data, id }) => {
    const addedColumn = await addColumn(data, id);
    return addedColumn
})

export const editColumnAsync = createAsyncThunk("projects/editColumnAsync", async ({ data, idObject }) => {
    const editedColumn = await editColumn(data, idObject);
    return editedColumn
})

export const editTaskAsync = createAsyncThunk("projects/editTaskAsync", async ({ data, idObject }) => {
    const editedTask = await editTask(data, idObject);
    return editedTask
})

export const fetchWorkspaceMembersAsync = createAsyncThunk('projects/fetchWorkspaceMembers', async (workspaceId) => {
    const workspaces = await fetchWorkspaceMembers(workspaceId);
    return workspaces;
}
);

export const columnOrderChangeAsync = createAsyncThunk(`projects/columnOrderChangeAsync`, async ({ order, projectId }) => {
    const projects = await columnOrderChange({ order, projectId });
    return projects;
})

export const deactivateTaskAsync = createAsyncThunk(`projects/deactivateTaskAsync`, async (idObject) => {
    const project = await deactivateTask(idObject);
    return project
})

export const createProjectAIAsync = createAsyncThunk(`projects/createProjectAIAsync` , async (data) => {
    const project= await createProjectAI(data);
    return project
})

const projectSlice = createSlice({
    name: "projectSlice",
    initialState: initialState,
    reducers: {
        clearProjectErrors: (state) => {
            state.errors = null
        },
        clearProjectSuccessMessage: (state) => {
            state.sucessMessage = null
        },
        resetProjectStatus: (state) => {
            state.status = 'idle'
        },
        resetProjectFetchStatus: (state) => {
            state.projectFetchStatus = 'idle'
        },
        resetTaskAddStatus: (state) => {
            state.taskAddStatus = 'idle';
        },
        resetProjectAddStatus: (state) => {
            state.projectAddStatus = "idle"
        },
        resetColumnAddStatus: (state) => {
            state.columnAddStatus = "idle"
        },
        resetColumnEditStatus: (state) => {
            state.columnEditStatus = "idle"
        },
        resetColumnorderChangeStatus: (state) => {
            state.columnorderChangeStatus = "idle"
        },
        resetTaskDeleteStatus: (state) => {
            state.taskDeleteStatus = "idle"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectAsync.pending, (state) => {
                state.projectFetchStatus = 'loading'
                state.selectedProject=[];
            })
            .addCase(fetchProjectAsync.fulfilled, (state, action) => {
                state.projectFetchStatus = "fulfilled"
                state.projects = action.payload.data
            })
            .addCase(fetchProjectAsync.rejected, (state, action) => {
                state.projectFetchStatus = "rejected"
                state.errors = action.error
            })
            .addCase(fetchProjectByIdAsync.pending, (state) => {
                state.projectFetchStatus = "loading"
            })
            .addCase(fetchProjectByIdAsync.fulfilled, (state, action) => {
                state.projectFetchStatus = "fulfilled"
                state.selectedProject = action.payload
                // Clear or reset other state data here
                state.workspaceMembers=null;
                state.taskAddStatus = "idle";
                state.taskMoveStatus = "idle";
                state.columnAddStatus = "idle";
                state.columnEditStatus = "idle";
                state.taskEditStatus = "idle";
                state.columnorderChangeStatus = "idle";
                state.taskDeleteStatus = "idle";
                state.errors = null;
                state.sucessMessage = null;
            })
            .addCase(fetchProjectByIdAsync.rejected, (state, action) => {
                state.projectFetchStatus = "rejected"
                state.errors = action.error
            })
            .addCase(createProjectAIAsync.pending, (state) =>{
                state.projectFetchStatus = "loading"
            })
            .addCase(createProjectAIAsync.fulfilled, (state,action) =>{
                state.projectFetchStatus = "fulfilled"
                state.selectedProject = action.payload
                // Clear or reset other state data here
                state.workspaceMembers=null;
                state.taskAddStatus = "idle";
                state.taskMoveStatus = "idle";
                state.columnAddStatus = "idle";
                state.columnEditStatus = "idle";
                state.taskEditStatus = "idle";
                state.columnorderChangeStatus = "idle";
                state.taskDeleteStatus = "idle";
                state.errors = null;
                state.sucessMessage = null;
            })
            .addCase(createProjectAIAsync.rejected, (state,action) =>{
                state.projectFetchStatus = "rejected"
                state.errors = action.error
            })
            .addCase(addProjectAsync.pending, (state, action) => {
                state.projectAddStatus = "pending"
            })
            .addCase(addProjectAsync.fulfilled, (state, action) => {
                state.projectAddStatus = "fulfilled"
                state.projects.push(action.payload)
            })
            .addCase(addProjectAsync.rejected, (state, action) => {
                state.projectAddStatus = "rejected"
                state.errors = action.error
            })
            .addCase(addTaskAsync.pending, (state, action) => {
                state.taskAddStatus = "pending"
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.taskAddStatus = "fulfilled"
                state.selectedProject.tasks.push(action.payload)
            })
            .addCase(addTaskAsync.rejected, (state, action) => {
                state.taskAddStatus = "rejected"
                state.errors = action.error
            })
            .addCase(moveTaskAsync.pending, (state, action) => {
                state.taskMoveStatus = "pending"
                state.projectFetchStatus = "loading"
            })
            .addCase(moveTaskAsync.fulfilled, (state, action) => {
                state.taskMoveStatus = "fulfilled"
                state.projectFetchStatus = "idle"
                //state.selectedProject=action.payload
            })
            .addCase(moveTaskAsync.rejected, (state, action) => {
                state.taskMoveStatus = "rejected"
            })
            .addCase(addColumnAsync.pending, (state, action) => {
                state.columnAddStatus = "pending"
            })
            .addCase(addColumnAsync.fulfilled, (state, action) => {
                state.columnAddStatus = "fulfilled"
                state.selectedProject = action.payload
            })
            .addCase(addColumnAsync.rejected, (state, action) => {
                state.columnAddStatus = "rejected"
            })
            .addCase(editColumnAsync.pending, (state, action) => {
                state.columnEditStatus = "pending"
            })
            .addCase(editColumnAsync.fulfilled, (state, action) => {
                state.columnEditStatus = "fulfilled"
            })
            .addCase(editColumnAsync.rejected, (state, action) => {
                state.columnEditStatus = "rejected"
            })
            .addCase(editTaskAsync.pending, (state, action) => {
                state.taskEditStatus = "pending"
            })
            .addCase(editTaskAsync.fulfilled, (state, action) => {
                state.taskEditStatus = "fulfilled";
                state.selectedProject = action.payload;
            })
            .addCase(editTaskAsync.rejected, (state, action) => {
                state.taskEditStatus = "rejected"
            })
            .addCase(fetchWorkspaceMembersAsync.pending, (state) => {
                state.workspaceMembersFetchStatus = "loading"
            })
            .addCase(fetchWorkspaceMembersAsync.fulfilled, (state, action) => {
                state.workspaceMembersFetchStatus = "fulfilled"
                state.workspaceMembers = action.payload
            })
            .addCase(fetchWorkspaceMembersAsync.rejected, (state, action) => {
                state.workspaceMembersFetchStatus = "rejected"
            })
            .addCase(columnOrderChangeAsync.pending, (state) => {
                state.columnorderChangeStatus = "loading"
            })
            .addCase(columnOrderChangeAsync.fulfilled, (state, action) => {
                state.columnorderChangeStatus = "fulfilled"
                state.selectedProject = action.payload
            })
            .addCase(columnOrderChangeAsync.rejected, (state, action) => {
                state.columnorderChangeStatus = "rejected"
            })
            .addCase(deactivateTaskAsync.pending, (state) => {
                state.taskDeleteStatus = "loading"
            })
            .addCase(deactivateTaskAsync.fulfilled, (state, action) => {
                state.taskDeleteStatus = "fulfilled"
                state.selectedProject = action.payload
            })
            .addCase(deactivateTaskAsync.rejected, (state, action) => {
                state.taskDeleteStatus = "rejected"
            })
    }
})

export const {
    clearProjectErrors,
    clearProjectSuccessMessage,
    resetProjectStatus,
    resetProjectFetchStatus,
    resetTaskAddStatus,
    resetProjectAddStatus,
    resetColumnAddStatus,
    resetColumnEditStatus,
    resetColumnorderChangeStatus,
    resetTaskDeleteStatus
} = projectSlice.actions;

export default projectSlice.reducer;