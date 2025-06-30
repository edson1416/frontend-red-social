// src/socket.js
import { io } from "socket.io-client";

// Instancia única del socket (Singleton)
const socket = io("http://localhost:3000", {
    autoConnect: false, // no se conecta automáticamente
    transports: ['websocket'],
});

// Opcional: puedes agregar listeners base aquí si quieres
export default socket;
