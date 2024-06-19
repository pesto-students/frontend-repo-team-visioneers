import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createWorkspace,
  fetchWorkspaceByUserID,
  fetchWorkspaceById,
  fetchWorkspaceProjects,
  fetchWorkspaceMembers,
  fetchWorkspaceTasks,
  uploadFile,
  getImageUrl,
  exitMember,
  updateMemberRole,
  addMember,
  updateWorkspace,
  fetchTasksByUserID,
  getWorkspaceMediaAndDocs,
  removeMember,
  getExistingData
} from "./workspaceApi";

const initialState = {
  workspaces: [],
  workspaceFetchStatus: 'idle',
  selectedWorkspace: null,
  newdWorkspace: {},
  existingWorkspaceName: [],
  existingUserEmails: [],
  selectedProjects: [],
  selectedTasks: [],
  selectedMembers: [],
  userTasks: [],
  selectedMediaAndDocs: [],
  fetchWorkspaceByUserIDStatus: 'idle',
  fetchTasksByUserIDStatus: 'idle',
  fetchWorkspaceByIdStatus: 'idle',
  fetchWorkspaceProjectsStatus: 'idle',
  fetchWorkspaceTasksStatus: 'idle',
  fetchWorkspaceMembersStatus: 'idle',
  fetchExistingDataStatus: 'idle',
  createWorkspaceStatus: 'idle',
  uploadFileStatus: 'idle',
  getImageUrlStatus: 'idle',
  exitMemberStatus: 'idle',
  updateMemberRoleStatus: 'idle',
  addMemberStatus: 'idle',
  updateWorkspaceStatus: 'idle',
  getWorkspaceMediaAndDocsStatus: 'idle',
  removeMemberAsyncStatus: 'idle',
  status: "idle",
  errors: null,
  successMessage: null
};

export const fetchWorkspaceByUserIDAsync = createAsyncThunk("workspaces/fetchWorkspaceByUserID", async (userId) => {
  const workspaces = await fetchWorkspaceByUserID(userId);
  return workspaces;
});

export const fetchTasksByUserIDAsync = createAsyncThunk("workspaces/fetchTasksByUserIDAsync", async ({userId, projectName}) => {
  const userTasks = await fetchTasksByUserID({userId, projectName});
  return userTasks;
});

export const fetchWorkspaceByIdAsync = createAsyncThunk("workspaces/fetchWorkspaceById", async (id) => {
  const selectedWorkspace = await fetchWorkspaceById(id);
  return selectedWorkspace;
});

export const fetchWorkspaceProjectsAsync = createAsyncThunk('workspace/fetchWorkspaceProjects', async (workspaceId) => {
  const selectedProjects = await fetchWorkspaceProjects(workspaceId);
  return selectedProjects;
});

export const fetchWorkspaceTasksAsync = createAsyncThunk('workspace/fetchWorkspaceTasksAsync', async (workspaceId) => {
  const selectedTasks = await fetchWorkspaceTasks(workspaceId);
  return selectedTasks;
});

export const fetchWorkspaceMembersAsync = createAsyncThunk('workspace/fetchWorkspaceMembers', async (workspaceId) => {
  const selectedMembers = await fetchWorkspaceMembers(workspaceId);
  return selectedMembers;
});

export const createWorkspaceAsync = createAsyncThunk("workspaces/createWorkspace", async (newWorkspace) => {
  const response = await createWorkspace(newWorkspace);
  return response;
});

export const uploadFileAsync = createAsyncThunk("workspaces/uploadFile", async (formData) => {
  const response = await uploadFile(formData);
  return response.data;
});

export const getImageUrlAsync = createAsyncThunk("workspaces/getImageUrl", async (key) => {
  const response = await getImageUrl(key);
  return response.data;
});

export const exitMemberAsync = createAsyncThunk("workspaces/exitMember", async ({ workspaceId, userId }) => {
  const response = await exitMember(workspaceId, userId);
  return response.data;
});

export const updateMemberRoleAsync = createAsyncThunk('members/updateMemberRole', async ({ workspaceId, adminUserId, userId, role }) => {
  const response = await updateMemberRole(workspaceId, adminUserId, userId, role);
  return response.data;
});

export const addMemberAsync = createAsyncThunk('members/addMember', async ({ workspaceId, adminUserId, memberEmails }) => {
  const response = await addMember(workspaceId, adminUserId, memberEmails);
  return response.data;
});

export const removeMemberAsync = createAsyncThunk('members/removeMember', async ({ workspaceId, adminUserId, memberEmails }) => {
  const response = await removeMember(workspaceId, adminUserId, memberEmails);
  return response.data;
});

export const updateWorkspaceAsync = createAsyncThunk("workspaces/updateWorkspace", async ({ id, updatedWorkspace }) => {
  const selectedWorkspace = await updateWorkspace({id, updatedWorkspace});
  return selectedWorkspace;
});

export const fetchWorkspaceMediaAndDocsAsync = createAsyncThunk('workspace/fetchWorkspaceMediaAndDocsAsync', async ({workspaceId}) => {
  const selectedMediaAndDocs = await getWorkspaceMediaAndDocs({workspaceId});
  return selectedMediaAndDocs;
});

export const fetchExistingDataAsync = createAsyncThunk(
  "workspaces/fetchExistingData",
  async ({ collection, key }) => {
    try {
      const response = await getExistingData(collection, key);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const workspaceSlice = createSlice({
  name: "workspaceSlice",
  initialState: initialState,
  reducers: {
    clearworkspaceErrors: (state) => {
      state.errors = null;
    },
    clearworkspaceSuccessMessage: (state) => {
      state.successMessage = null;
    },
    resetworkspaceStatus: (state) => {
      state.status = 'idle';
    },
    resetworkspacesFetchStatus: (state) => {
      state.workspaceFetchStatus = 'idle';
    },
    resetfetchWorkspaceByUserIDStatus: (state) => {
      state.fetchWorkspaceByUserIDStatus = 'idle';
    },
    resetfetchTasksByUserIDStatus: (state) => {
      state.fetchTasksByUserIDStatus = 'idle';
    },
    resetfetchWorkspaceByIdStatus: (state) => {
      state.fetchWorkspaceByIdStatus = 'idle';
    },
    resetfetchWorkspaceProjectsStatus: (state) => {
      state.fetchWorkspaceProjectsStatus = 'idle';
    },
    resetfetchWorkspaceTasksStatus: (state) => {
      state.fetchWorkspaceTasksStatus = 'idle';
    },
    resetfetchWorkspaceMembersStatus: (state) => {
      state.fetchWorkspaceMembersStatus = 'idle';
    },
    resetcreateWorkspaceStatus: (state) => {
      state.createWorkspaceStatus = 'idle';
    },
    resetuploadFileStatus: (state) => {
      state.uploadFileStatus = 'idle';
    },
    resetgetImageUrlStatus: (state) => {
      state.getImageUrlStatus = 'idle';
    },
    resetexitMemberStatus: (state) => {
      state.exitMemberStatus = 'idle';
    },
    resetupdateMemberRoleStatus: (state) => {
      state.updateMemberRoleStatus = 'idle';
    },
    resetaddMemberStatus: (state) => {
      state.addMemberStatus = 'idle';
    },
    resetupdateWorkspaceStatus: (state) => {
      state.updateWorkspaceStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaceByIdAsync.pending, (state) => {
        state.fetchWorkspaceByIdStatus = 'loading';
      })
      .addCase(fetchWorkspaceByIdAsync.fulfilled, (state, action) => {
        state.fetchWorkspaceByIdStatus = 'fulfilled';
        state.selectedWorkspace = action.payload.data;
      })
      .addCase(fetchWorkspaceByIdAsync.rejected, (state, action) => {
        state.fetchWorkspaceByIdStatus = "rejected";
        state.errors = action.error.message;
      })
      .addCase(fetchWorkspaceProjectsAsync.pending, (state) => {
        state.fetchWorkspaceProjectsStatus = "loading";
      })
      .addCase(fetchWorkspaceProjectsAsync.fulfilled, (state, action) => {
        state.fetchWorkspaceProjectsStatus = "fulfilled";
        state.selectedProjects = action.payload.data;
      })
      .addCase(fetchWorkspaceProjectsAsync.rejected, (state, action) => {
        state.fetchWorkspaceProjectsStatus = "rejected";
        state.errors = action.error.message;
      })
      .addCase(fetchWorkspaceTasksAsync.pending, (state) => {
        state.fetchWorkspaceTasksStatus = "loading";
      })
      .addCase(fetchWorkspaceTasksAsync.fulfilled, (state, action) => {
        state.fetchWorkspaceTasksStatus = "fulfilled";
        state.selectedTasks = action.payload.data;
      })
      .addCase(fetchWorkspaceTasksAsync.rejected, (state, action) => {
        state.fetchWorkspaceTasksStatus = "rejected";
        state.errors = action.error.message;
      })
      .addCase(fetchWorkspaceMembersAsync.pending, (state) => {
        state.fetchWorkspaceMembersStatus = "loading";
      })
      .addCase(fetchWorkspaceMembersAsync.fulfilled, (state, action) => {
        state.fetchWorkspaceMembersStatus = "fulfilled";
        state.selectedMembers = action.payload.data;
      })
      .addCase(fetchWorkspaceMembersAsync.rejected, (state, action) => {
        state.fetchWorkspaceMembersStatus = "rejected";
        state.errors = action.error.message;
      })
      .addCase(fetchWorkspaceByUserIDAsync.pending, (state) => {
        state.workspaceFetchStatus = 'loading';
      })
      .addCase(fetchWorkspaceByUserIDAsync.fulfilled, (state, action) => {
        state.workspaceFetchStatus = "fulfilled";
        state.workspaces = action.payload.data;
      })
      .addCase(fetchWorkspaceByUserIDAsync.rejected, (state, action) => {
        state.workspaceFetchStatus = "rejected";
        state.errors = action.error.message;
      })
      .addCase(fetchTasksByUserIDAsync.pending, (state) => {
        state.fetchTasksByUserIDStatus = 'loading';
      })
      .addCase(fetchTasksByUserIDAsync.fulfilled, (state, action) => {
        state.fetchTasksByUserIDStatus = "fulfilled";
        state.userTasks = action.payload.data;
      })
      .addCase(fetchTasksByUserIDAsync.rejected, (state, action) => {
        state.fetchTasksByUserIDStatus = "rejected";
        state.errors = action.error.message;
      })
      .addCase(createWorkspaceAsync.pending, (state) => {
        state.createWorkspaceStatus = 'loading';
      })
      .addCase(createWorkspaceAsync.fulfilled, (state, action) => {
        state.createWorkspaceStatus = 'fulfilled';
        state.workspaces.push(action.payload); // Update the state with the new workspace
        state.newdWorkspace = action.payload;
        state.successMessage = 'Workspace created successfully!';
      })
      .addCase(createWorkspaceAsync.rejected, (state, action) => {
        state.createWorkspaceStatus = 'rejected';
        state.errors = action.error.message;
      })
      .addCase(exitMemberAsync.pending, (state) => {
        state.exitMemberStatus = 'loading';
      })
      .addCase(exitMemberAsync.fulfilled, (state, action) => {
        state.exitMemberStatus = 'fulfilled';
        state.successMessage = 'Member exited successfully!';
      })
      .addCase(exitMemberAsync.rejected, (state, action) => {
        state.exitMemberStatus = 'rejected';
        state.errors = action.error.message;
      })
      .addCase(updateMemberRoleAsync.pending, (state) => {
        state.updateMemberRoleStatus = 'loading';
      })
      .addCase(updateMemberRoleAsync.fulfilled, (state, action) => {
        state.updateMemberRoleStatus = 'fulfilled';
        state.successMessage = 'Updated Member Role successfully!';
      })
      .addCase(updateMemberRoleAsync.rejected, (state, action) => {
        state.updateMemberRoleStatus = 'rejected';
        state.errors = action.error.message;
      })
      .addCase(addMemberAsync.pending, (state) => {
        state.addMemberStatus = 'loading';
      })
      .addCase(addMemberAsync.fulfilled, (state, action) => {
        state.addMemberStatus = 'fulfilled';
        state.successMessage = 'Added Member successfully!';
      })
      .addCase(addMemberAsync.rejected, (state, action) => {
        state.addMemberStatus = 'rejected';
        state.errors = action.error.message;
      })
      .addCase(removeMemberAsync.pending, (state) => {
        state.removeMemberAsyncStatus = 'loading';
      })
      .addCase(removeMemberAsync.fulfilled, (state, action) => {
        state.removeMemberAsyncStatus = 'fulfilled';
        state.successMessage = 'Removed Member successfully!';
      })
      .addCase(removeMemberAsync.rejected, (state, action) => {
        state.removeMemberAsyncStatus = 'rejected';
        state.errors = action.error.message;
      })
      .addCase(updateWorkspaceAsync.pending, (state) => {
        state.updateWorkspaceStatus = 'loading';
      })
      .addCase(updateWorkspaceAsync.fulfilled, (state, action) => {
        state.updateWorkspaceStatus = 'fulfilled';
        state.selectedWorkspace = action.payload.data;
      })
      .addCase(updateWorkspaceAsync.rejected, (state, action) => {
        state.updateWorkspaceStatus = 'rejected';
        state.errors = action.error.message;
      })
      .addCase(fetchWorkspaceMediaAndDocsAsync.pending, (state) => {
        state.getWorkspaceMediaAndDocsStatus = 'loading';
      })
      .addCase(fetchWorkspaceMediaAndDocsAsync.fulfilled, (state, action) => {
        state.getWorkspaceMediaAndDocsStatus = 'fulfilled';
        state.selectedMediaAndDocs = action.payload.data;
        state.successMessage = 'Workspace data fetched successfully!';
      })
      .addCase(fetchWorkspaceMediaAndDocsAsync.rejected, (state, action) => {
        state.getWorkspaceMediaAndDocsStatus = 'rejected';
        state.errors = action.error.message;
      })
      .addCase(fetchExistingDataAsync.pending, (state) => {
        state.fetchExistingDataStatus = 'pending';
      })
      .addCase(fetchExistingDataAsync.fulfilled, (state, action) => {
        if (action.meta.arg.collection === 'Workspace') {
          state.existingWorkspaceName = action.payload;
        } else if (action.meta.arg.collection === 'User') {
          state.existingUserEmails = action.payload;
        }
        state.fetchExistingDataStatus = 'fulfilled';
        state.successMessage = 'Data fetched successfully!';
      })
      .addCase(fetchExistingDataAsync.rejected, (state, action) => {
        state.fetchExistingDataStatus = 'rejected';
        state.errorMessage = action.error.message;
      });
  }
});

export const {
  clearworkspaceErrors,
  clearworkspaceSuccessMessage,
  resetworkspaceStatus,
  resetworkspacesFetchStatus,
  resetfetchWorkspaceByUserIDStatus,
  resetfetchTasksByUserIDStatus,
  resetfetchWorkspaceByIdStatus,
  resetfetchWorkspaceProjectsStatus,
  resetfetchWorkspaceTasksStatus,
  resetfetchWorkspaceMembersStatus,
  resetcreateWorkspaceStatus,
  resetuploadFileStatus,
  resetgetImageUrlStatus,
  resetexitMemberStatus,
  resetupdateMemberRoleStatus,
  resetaddMemberStatus,
  resetupdateWorkspaceStatus,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
