import React, { useContext, useEffect, useState } from "react";
import NotificationContext from "../AuthContext/NotificationContext";
import { AuthContext } from "../AuthContext/AuthContext";
import { Socket } from "socket.io-client";



const NotificationComp = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { user } = useContext(AuthContext);
  const { notifications, fetchNotifications, markAsRead, deleteNotification } =
    useContext(NotificationContext);

  const userId = user ? user._id : null;

  useEffect(() => {
    if (userId) {
      fetchingNotifications();
    }
  }, [userId, page, fetchNotifications]);

  useEffect(() => {
    if (userId) {
      Socket.emit("joinRoom", userId);

      const handleTransactionUpdate = (data) => {
        fetchNotifications(userId);
      };

      Socket.on("transaction-update", handleTransactionUpdate);

      return () => {
        Socket.off("transaction-update", handleTransactionUpdate);
      };
    }
  }, [userId]);

  const fetchingNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetchNotifications(userId, 1, 10);

      setHasMore(response.data.notification.length > 0);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
    } catch (error) {
      console.error("Error marking notification as read:", error);
      setError("Failed to mark notification as read.");
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await deleteNotification(id);
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
      {notifications && notifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id} style={{ marginBottom: "10px" }}>
              <p>{notification.message}</p>
              <p>Status: {notification.isRead ? "Read" : "Unread"}</p>
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
