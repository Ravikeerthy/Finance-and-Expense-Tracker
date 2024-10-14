import React, { useContext, useEffect, useState } from "react";
import {
  getNotificationsByUserId,
  markNotificationAsRead,
  deleteNotification,
} from "../services/notificationService"; // Import the services
import { AuthContext } from "../AuthContext/AuthContext";

const NotificationComp = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { user } = useContext(AuthContext);

  const userId = user ? user._id : null;

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await getNotificationsByUserId(userId, 1, 10);
        setNotifications((prev) => [...prev, ...response.data.notification]);
        setHasMore(response.data.notification.length > 0);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
      setError("Failed to mark notification as read.");
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
      setError("Failed to delete notification.");
    }
  };

  const loadMoreNotifications = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  if (loading && notifications.length === 0)
    return <div>Loading notifications...</div>;

  return (
    <div>
      <h2>Notifications</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {notifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id} style={{ marginBottom: "10px" }}>
              <p>{notification.message}</p>
              <p>Status: {notification.read ? "Read" : "Unread"}</p>
              <button onClick={() => handleMarkAsRead(notification._id)}>
                Mark as Read
              </button>
              <button
                onClick={() => handleDeleteNotification(notification._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {hasMore && !loading && (
        <button onClick={loadMoreNotifications}>Load More</button>
      )}
      {loading && <div>Loading more notifications...</div>}
    </div>
  );
};

export default NotificationComp;
