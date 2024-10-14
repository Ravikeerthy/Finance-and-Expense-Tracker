import React, { useContext, useEffect, useState } from "react";

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
      try {
        const response = await getNotificationsByUserId(userId, 1, 10);
        setNotifications(response.data.notification);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const loadMoreNotifications = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading && notifications.length === 0) return <div>Loading notifications...</div>;


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
            <button onClick={() => handleDeleteNotification(notification._id)}>
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
