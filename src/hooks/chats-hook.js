import {useEffect, useState} from "react";
import {chatsUsuario} from "../services/usuario-service.js";
import socket from '/src/util/socket.js'


export const useMisChats = (openChats) => {

    const [misChats, setMisChats] = useState([]);
    const [cargando, setCargando] = useState(true);

    const cargarMisChats = async () => {
        const response = await chatsUsuario()
        setMisChats(response.mis_chats);
        setCargando(false);
    }

    useEffect(() => {
        if (openChats) {
            cargarMisChats()
        }
        socket.on("estoy_conectado",()=>cargarMisChats())

    },[openChats,socket]);

    return {misChats, cargando};
}