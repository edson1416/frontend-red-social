import React, {useEffect, useRef} from 'react';
import socket from '/src/util/socket.js'
import BotonMisChats from "./components/BotonMisChats.jsx";
import ListaMisChats from "./components/ListaMisChats.jsx";
import MainChat from "./components/MainChat.jsx";
import {useAbrirChats} from "../../hooks/abrir-chat-hook.js";

const Chats = ({id_usuario}) => {

    const {
        openChat,
        openChats,
        showMisChats,
        setOpenChats,
        miembro,
        handleopenChat,
        handlecloseChat,
        chat
    } = useAbrirChats();

    const mensajeFinal = useRef(null);
    const [mensajes, setMensajes] = React.useState([]);
    const [mensajesNoLeidos, setMensajesNoLeidos] = React.useState(0);
    const [nuevoMensaje, setNuevoMensaje] = React.useState('');

    const cargarMensaje = (data) => {
        setMensajes(data);
    }

    const mensajeRecibido = (data) => {
        setMensajes((prev) => [...prev, data]);
    }

    const contadorDM = (data) => {
        console.log("contador: ",data)
        setMensajesNoLeidos(data);
    }

    useEffect(() => {
        if (!socket.connected) {
            socket.io.opts.query = {
                idUsuario: id_usuario,
            }
            socket.connect()
        }

        socket.onAny((eventName) => {
            console.log(`escuchando: ${eventName}`);
        })

        // Cada vez que cambian los mensajes, hace scroll al final
        mensajeFinal.current?.scrollIntoView({behavior: 'smooth'});

        socket.on('mensaje_recibido', mensajeRecibido)
        socket.on('cargar_mensajes', cargarMensaje)
        socket.on('mensajes_no_leidos',contadorDM)

        return () => {
            socket.off('mensaje_recibido', mensajeRecibido);
        };
    }, [socket, openChats ?? false, mensajes])


    const enviarMensaje = async () => {
        if (nuevoMensaje !== '') {
            const info = {
                mensaje: nuevoMensaje,
                chat_id: chat,
                user_id: id_usuario,
            }

            await socket.emit('enviar_mensaje', info)
            setNuevoMensaje('')
        }
    }

    return (<div>

            {showMisChats && (
                <BotonMisChats openChats={openChats} setOpenChats={setOpenChats} mensajesNoLeidos={mensajesNoLeidos}></BotonMisChats>
            )}

            {/*Mis chats*/}
            {openChats && (
                <ListaMisChats openChats={openChats} id_usuario={id_usuario} handleopenChat={handleopenChat}></ListaMisChats>
            )}

            {/*Chat en especifico*/}
            {openChat && (
                <MainChat
                    miembro={miembro}
                    mensajes={mensajes}
                    id_usuario={id_usuario}
                    mensajeFinal={mensajeFinal}
                    nuevoMensaje={nuevoMensaje}
                    setNuevoMensaje={setNuevoMensaje}
                    enviarMensaje={enviarMensaje}
                    handleCloseChat={handlecloseChat}
                    chat_id={chat}
                ></MainChat>
            )}

        </div>

    );
};

export default Chats;