import React, { useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://back-end-d6p7.onrender.com");

const TransactionComponent = () => {
  const [message, setMessage] = useState("");
  const [transactionData, setTransactionData] = useState(null);
  useEffect(() => {
    // Join the room with the user's ID
    const userId = "userId"; // Replace with actual user ID
    socket.emit("joinRoom", userId);

    // Listen for messages from the server
    socket.on("message", (msg) => {
      console.log(msg);
      setMessage(msg);
    });

    // Listen for transaction updates
    socket.on("transaction-update", (data) => {
      console.log("Transaction Data:", data);
      setTransactionData(data);
      // Handle the transaction update in your UI
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off("message");
      socket.off("transaction-update");
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <h1>Transaction Updates</h1>
      <p>{message}</p>
      {transactionData && (
        <div>
          <h2>Transaction Details:</h2>
          <pre>{JSON.stringify(transactionData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TransactionComponent;
