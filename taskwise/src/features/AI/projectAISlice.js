import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProjectAI } from "./projectAIApi";

const initialState = {
  projectAIFetchStatus: "idle",
  status: "idle",
  errors: null,
  sucessMessage: null,
  aiData: null,
};

export const createProjectAIASync = createAsyncThunk(
  "projectsAI/createProjectAIASync",
  async (data) => {
    const projects = await createProjectAI(data);
    return projects;
  }
);

const AISlice = createSlice({
  name: "AISlice",
  initialState: initialState,
  reducers: {
    clearAIErrors: (state) => {
      state.errors = null;
    },
    clearAISuccessMessage: (state) => {
      state.sucessMessage = null;
    },
    resetAIStatus: (state) => {
      state.status = "idle";
    },
    resetAIFetchStatus: (state) => {
      state.projectAIFetchStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProjectAIASync.pending, (state) => {
        state.projectAIFetchStatus = "loading";
      })
      .addCase(createProjectAIASync.fulfilled, (state, action) => {
        state.projectAIFetchStatus = "fulfilled";
        state.aiData = action.payload.data;
      })
      .addCase(createProjectAIASync.rejected, (state, action) => {
        state.projectAIFetchStatus = "rejected";
        state.errors = action.error;
      });
  },
});

export const {
  clearAIErrors,
  clearAISuccessMessage,
  resetAIStatus,
  resetAIFetchStatus,
} = AISlice.actions;

export default AISlice.reducer;
