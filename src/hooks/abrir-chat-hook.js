import React, {useEffect} from "react";
import socket from "../util/socket.js";


export const useAbrirChats = () => {

    const [openChats, setOpenChats] = React.useState(false);
    const [openChat, setOpenChat] = React.useState(false);
    const [showMisChats, setShowMisChat] = React.useState(true);
    const [chat, setChat] = React.useState(null);

    const [miembro, setMiembro] = React.useState({
        nombreMiembro: '',
        conectado: false,
        ultimaConexion: null,
    });

    const handleopenChat = (id_chat, nombre_miembro, conectado, ultimaConexion = null) => {
        setMiembro({
            nombreMiembro: nombre_miembro,
            conectado: conectado,
            ultimaConexion: ultimaConexion,
        })

        setChat(id_chat);
        setOpenChat(true);
        socket.emit('entrar_chat', id_chat.toString());

        setOpenChats(false);
        setShowMisChat(false);
    }

    const handlecloseChat = (id_chat) => {
        setOpenChat(false)
        setShowMisChat(true)
        socket.emit('salir_chat', id_chat)
    }

    useEffect(() => {
    },);

    return {
        openChats,
        openChat,
        showMisChats,
        chat,
        miembro,
        handleopenChat,
        handlecloseChat,
        setOpenChat,
        setOpenChats,
        setShowMisChat
    };
}