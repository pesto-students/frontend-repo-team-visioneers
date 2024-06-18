import { axiosi } from "../../config/axios";

export const fetchUnreadNotifications = async (userId) => {
  try {
    const res = await axiosi.get(`/notifications/${userId}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const res = await axiosi.patch(`/notifications/${notificationId}/read`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
