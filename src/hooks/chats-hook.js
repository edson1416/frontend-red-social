import {useEffect, useState} from "react";
import {chatsUsuario} from "../services/usuario-service.js";


export const useMisChats = (openChats) => {

    const [misChats, setMisChats] = useState([]);
    const [cargando, setCargando] = useState(true);

    const cargarMisChats = async () => {
        const response = await chatsUsuario()
        console.log(response.mis_chats)
        setMisChats(response.mis_chats);
        setCargando(false);
    }

    useEffect(() => {
        if (openChats) {
            cargarMisChats()
        }
    },[openChats]);

    return {misChats, cargando};
}