import axios from "axios";
import React, {  createContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async (userId) => {
    try {
      const notificationResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/notification/userId/${userId}`
      );
      setNotifications(notificationResponse.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  const markAsRead = async (notificationId) => {
    try {
      await axios.patch(`https://back-end-d6p7.onrender.com/notifications/markasread/${notificationId}`);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await axios.delete(`/api/notifications/delete/${notificationId}`);
      setNotifications((prev) => prev.filter((notification) => notification._id !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        fetchNotifications,
        markAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

