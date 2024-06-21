import React, { useState, useCallback } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider as MuiDivider,
  ListItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { markNotificationAsReadAsync } from "../features/notification/notificationSlice";

const NotificationItem = styled(ListItem)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "20px 16px",
  width: "100%",
  boxSizing: "border-box",
  borderBottom: "1px solid #eee",
});

const NotificationContent = styled(Box)({
  flexGrow: 1,
  paddingLeft: "16px",
});

const Divider = styled(MuiDivider)({
  margin: 0,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
});

const StyledSpan = styled("span")(({ color }) => ({
  color: color || "inherit",
}));

const parseMessage = (message) => {
  const taskNameRegex = /<taskName>(.*?)<\/taskName>/;
  const projectNameRegex = /<projectName>(.*?)<\/projectName>/;
  const workspaceNameRegex = /<workspaceName>(.*?)<\/workspaceName>/;

  const parts = [];
  let remainingMessage = message;

  while (remainingMessage) {
    const taskMatch = remainingMessage.match(taskNameRegex);
    const projectMatch = remainingMessage.match(projectNameRegex);
    const workspaceMatch = remainingMessage.match(workspaceNameRegex);

    if (!taskMatch && !projectMatch && !workspaceMatch) {
      parts.push(remainingMessage);
      break;
    }

    const firstMatch = [taskMatch, projectMatch, workspaceMatch]
      .filter(Boolean)
      .sort((a, b) => a.index - b.index)[0];

    if (firstMatch.index > 0) {
      parts.push(remainingMessage.slice(0, firstMatch.index));
    }

    const [fullMatch, content] = firstMatch;
    const color =
      firstMatch === taskMatch
        ? "#79bae8"
        : firstMatch === projectMatch
        ? "#79e8af"
        : "#f07592";
    parts.push(
      <StyledSpan color={color} key={content}>
        {content}
      </StyledSpan>
    );

    remainingMessage = remainingMessage.slice(
      firstMatch.index + fullMatch.length
    );
  }

  return parts;
};

// const SeeAllNotifications = styled(Typography)({
//   textAlign: "center",
//   padding: "10px",
//   fontWeight: "bold",
//   color: "#0073e6",
//   cursor: "pointer",
// });

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notification.unreadNotifications
  );
  const notificationFetchStatus = useSelector(
    (state) => state.notification.notificationFetchStatus
  );
  // const userId = useSelector((state) => state.user.loggedInUser?.user?._id);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(fetchUnreadNotificationsAsync(userId));
  //   }
  // }, [userId, dispatch]);

  const handleMenuOpen = (event, notification) => {
    setAnchorEl(event.currentTarget);
    setSelectedNotification(notification);
  };

  // useCallback is used to memoize the handleMenuClose function
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setSelectedNotification(null);
  }, []);

  // useCallback is used to memoize the markAsRead function
  const markAsRead = useCallback(() => {
    handleMenuClose(); // Close the menu first
    dispatch(markNotificationAsReadAsync(selectedNotification.id))
      .unwrap()
      .then(() => {
        // Menu is already closed, no additional action needed
      })
      .catch((error) => {
        console.error("Failed to mark notification as read: ", error);
      });
  }, [dispatch, handleMenuClose, selectedNotification]);

  // const deleteNotification = () => {};

  return (
    <Box width="400px" bgcolor="#fff" border="1px solid #ccc">
      <Typography
        variant="body2"
        fontWeight="bold"
        align="left"
        paddingLeft="30px"
        paddingTop="10px"
        paddingBottom="10px"
      >
        Notifications
      </Typography>
      <Divider />

      {notificationFetchStatus === "loading" ? (
        <Typography align="center" padding="20px">
          Loading...
        </Typography>
      ) : notifications?.length === 0 ? (
        <Typography align="center" padding="20px">
          No new notifications
        </Typography>
      ) : (
        notifications?.map((notification) => (
          <NotificationItem key={notification.id}>
            <NotificationContent>
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                {parseMessage(notification.message)}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(notification.createdAt).toLocaleString()}
              </Typography>
            </NotificationContent>
            <IconButton
              onClick={(e) => handleMenuOpen(e, notification)}
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </NotificationItem>
        ))
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={markAsRead}>Mark As Read</MenuItem>
        {/* <MenuItem onClick={deleteNotification}>Delete</MenuItem> */}
      </Menu>
      {/* <Divider style={{ margin: 0 }} />
      <SeeAllNotifications>See All Notifications</SeeAllNotifications> */}
    </Box>
  );
};

// React.memo is used to memoize the Notifications component
export default React.memo(Notifications);
