// src/services/socket.ts
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
}); // Altere para a URL do seu servidor

export default socket;
