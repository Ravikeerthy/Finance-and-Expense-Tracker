import React, { useContext, useEffect, useState } from "react";
import socket from "../../Socket";
import { AuthContext } from "../AuthContext/AuthContext";

const NotificationComp = () => {
  const [notifications, setNotifications] = useState([]);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    if (userId) {
      socket.emit("joinRoom", userId);
    }

    const handleTransactionUpdate = (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    };
    socket.on("transaction-update", handleTransactionUpdate);

    return () => {
      socket.off("transaction-update", handleTransactionUpdate);
    };
  }, [userId]);
  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => {
          return <li key={index}>{notification.message}</li>;
        })}
      </ul>
    </div>
  );
};

export default NotificationComp;
