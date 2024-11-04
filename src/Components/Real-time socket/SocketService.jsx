import { io } from "socket.io-client";

let socket;

export const connectSocket = () => {
  socket = io("https://back-end-d6p7.onrender.com", { 
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Connected to the server:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from the server");
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not connected. Call connectSocket() first.");
  }
  return socket;
};
