import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {transports:["websocket", "polling"],});

const userId = "userId";
socket.emit('joinRoom', userId);

socket.on('message', (msg)=>{
    console.log(msg);
    
});

socket.on('transaction-update', (data) => {
    console.log('Transaction Update for your room:', data);
  });

export default socket;