import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUnreadNotifications,
  markNotificationAsRead,
} from "./notificationApi";

const initialState = {
  unreadNotifications: [],
  notificationFetchStatus: "idle",
  notificationMarkStatus: "idle",
  errors: null,
};

export const fetchUnreadNotificationsAsync = createAsyncThunk(
  "notifications/fetchUnreadNotifications",
  async (userId) => {
    const notifications = await fetchUnreadNotifications(userId);
    return notifications;
  }
);

export const markNotificationAsReadAsync = createAsyncThunk(
  "notifications/markNotificationAsRead",
  async (notificationId) => {
    const notification = await markNotificationAsRead(notificationId);
    return notification;
  }
);

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    clearNotificationErrors: (state) => {
      state.errors = null;
    },
    resetNotificationFetchStatus: (state) => {
      state.notificationFetchStatus = "idle";
    },
    resetNotificationMarkStatus: (state) => {
      state.notificationMarkStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnreadNotificationsAsync.pending, (state) => {
        state.notificationFetchStatus = "loading";
      })
      .addCase(fetchUnreadNotificationsAsync.fulfilled, (state, action) => {
        state.notificationFetchStatus = "fulfilled";
        state.unreadNotifications = action.payload;
      })
      .addCase(fetchUnreadNotificationsAsync.rejected, (state, action) => {
        state.notificationFetchStatus = "rejected";
        state.errors = action.error;
      })
      .addCase(markNotificationAsReadAsync.pending, (state) => {
        state.notificationMarkStatus = "loading";
      })
      .addCase(markNotificationAsReadAsync.fulfilled, (state, action) => {
        state.notificationMarkStatus = "fulfilled";
        state.unreadNotifications = state.unreadNotifications.filter(
          (notification) => notification.id !== action.payload.notificationId
        );
      })
      .addCase(markNotificationAsReadAsync.rejected, (state, action) => {
        state.notificationMarkStatus = "rejected";
        state.errors = action.error;
      });
  },
});

export const {
  clearNotificationErrors,
  resetNotificationFetchStatus,
  resetNotificationMarkStatus,
} = notificationSlice.actions;

export default notificationSlice.reducer;
