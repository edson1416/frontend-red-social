import React, {useEffect, useRef} from 'react';
import socket from '/src/util/socket.js'
import {format} from "date-fns";
import {es} from "date-fns/locale";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {useMisChats} from "../../hooks/chats-hook.js";
import HideSourceIcon from '@mui/icons-material/HideSource';

const Chats = ({id_usuario}) => {
    const [openChats, setOpenChats] = React.useState(false);
    const [openChat, setOpenChat] = React.useState(false);
    const [showMisChats, setShowMisChat] = React.useState(true);
    const mensajeFinal = useRef(null);

    const [nombreMiembro, setNombreMiembro] = React.useState('');
    const [miembroConectado, setMiembroConectado] = React.useState(false);
    const [ultimaConexion, setultimaConexion] = React.useState(null);
    const [chat, setChat] = React.useState(null);

    const [mensajes, setMensajes] = React.useState([]);
    const [nuevoMensaje, setNuevoMensaje] = React.useState('');
    const {misChats, cargando} = useMisChats(openChats);

    const cargarMensaje = (data) => {
        setMensajes(data);
    }

    const mensajeRecibido = (data) => {
        setMensajes((prev) => [...prev, data]);
    }

    useEffect(() => {
        if (!socket.connected) {
            socket.io.opts.query = {
                idUsuario: id_usuario,
            }
            socket.connect()
        }
        // Cada vez que cambian los mensajes, hace scroll al final
        mensajeFinal.current?.scrollIntoView({behavior: 'smooth'});

        socket.on('mensaje_recibido', mensajeRecibido)
        socket.on('cargar_mensajes', cargarMensaje)

        return () => {
            socket.off('mensaje_recibido', mensajeRecibido);
        };
    }, [socket, openChats ?? false, mensajes])

    const abrirChat = (id_chat, nombre_miembro,conectado,ultimaConexion =null ) => {
        setNombreMiembro(nombre_miembro);
        setMiembroConectado(conectado);
        setultimaConexion(ultimaConexion);
        setChat(id_chat);
        setOpenChat(true);
        socket.emit('entrar_chat', id_chat.toString());

        setOpenChats(false);
        setShowMisChat(false);
    }

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
            {/*Mis chats*/}
            {openChats && (<div className="bg-gray-200 space-y-2 fixed bottom-20 right-4
                w-60 h-96 p-2 rounded-lg shadow-lg z-50
                overflow-y-auto
                transition-all duration-300 ease-out
                opacity-100 translate-y-0">
                {!cargando ? misChats.map((item, index) => {
                        return (
                            <div key={index}
                                 className="flex flex-col bg-white p-2 rounded-lg hover:bg-gray-600 hover:text-white hover:cursor-pointer space-y-1">

                                {/* Recorrer miembros */}
                                {item.chats.miembros.map((miembro, i) => {

                                        if (miembro.user.id !== id_usuario) {
                                            return (
                                                <button key={i}
                                                        className="flex justify-between items-center w-full"
                                                        onClick={() => abrirChat(item.chat_id, miembro.user.name,miembro.user.conectado,miembro.user.fecha_ultima_conexion)}>
                                                    {miembro.user.conectado ?
                                                        <Brightness1Icon fontSize="small"
                                                                         sx={{color: 'green'}} ></Brightness1Icon>
                                                        :
                                                        <HideSourceIcon fontSize="small"
                                                                         sx={{color: 'red'}}>
                                                        </HideSourceIcon>
                                                    }

                                                    <span>{miembro.user.name}</span>
                                                    <div
                                                        className="bg-red-400 w-6 h-6 flex items-center justify-center rounded-full text-white text-xs">
                                                        2
                                                    </div>
                                                </button>

                                            )
                                        }
                                    }
                                )}

                            </div>
                        )
                    })

                    :
                    <h1>Sin chats</h1>
                }


            </div>)}

            {/*Chat en especifico*/}
            {openChat && (
                <div className="bg-gray-100 fixed bottom-20 right-4
                        w-72 rounded-lg shadow-lg z-50">
                    <div className="flex flex-col bg-gray-900 mb-3 items-center rounded-t-lg p-2">
                        <div className="flex justify-between w-full">
                            {miembroConectado ?
                                <Brightness1Icon fontSize="small" sx={{color: 'green'}}></Brightness1Icon>
                                :
                                <HideSourceIcon fontSize="small" sx={{color: 'red'}}></HideSourceIcon>
                            }

                            <h1 className="font-semibold text-white">
                                {nombreMiembro}
                            </h1>
                            <button className="hover:cursor-pointer" onClick={() => {
                                setOpenChat(false)
                                setShowMisChat(true)
                            }}>
                                <HighlightOffRoundedIcon sx={{color: 'white'}}></HighlightOffRoundedIcon>
                            </button>
                        </div>
                        <div>
                            {miembroConectado ?
                                <h1 className="text-xs text-white">enlínea</h1>
                                :
                                <h1 className="text-xs text-white">
                                    {ultimaConexion ?
                                        format(new Date(ultimaConexion), 'dd MMM, HH:mm',{locale:es})
                                        :
                                        "no hay conexion"
                                    }
                                </h1>
                            }

                        </div>

                    </div>
                    <div className="space-y-2 overflow-y-auto h-80 p-2">

                        {mensajes.length > 0 ? mensajes.map((mensaje) => {

                                if (mensaje.autor.id === id_usuario) {
                                    return (
                                        <div key={mensaje.id} className="flex justify-end">
                                            <div
                                                className="flex flex-col bg-gray-900 text-white w-2/3 p-2 rounded-lg overflow-hidden break-words">
                                                <h1>{mensaje.mensaje}</h1>
                                                <div className="flex justify-end">
                                                    <h2 className="font-thin text-xs">
                                                        {
                                                            format(new Date(mensaje.created_at), 'dd MMM, HH:mm', {locale: es})
                                                        }
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={mensaje.id} className="flex">
                                            <div
                                                className="flex flex-col bg-white w-2/3 p-2 rounded-lg overflow-hidden break-words">
                                                <h1>{mensaje.mensaje}</h1>
                                                <div className="flex justify-end">
                                                    <h2 className="font-thin text-xs">
                                                        {
                                                            format(new Date(mensaje.created_at), 'dd MMM, HH:mm', {locale: es})
                                                        }
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            })
                            : <h1>sin mensajes</h1>
                        }

                        <div ref={mensajeFinal}></div>
                    </div>

                    {/*Escribir mensaje*/}
                    <div className="flex space-x-3 justify-center p-2">
                        <input className="bg-white rounded-md shadow-md w-full p-1 placeholder:text-gray-500"
                               type="text" placeholder="message..."
                               value={nuevoMensaje}
                               onChange={e => setNuevoMensaje(e.target.value)}/>
                        <button className="hover:cursor-pointer bg-gray-900 p-1 text-white rounded-md shadow-md"
                                onClick={enviarMensaje}>
                            <SendRoundedIcon/>
                        </button>
                    </div>
                </div>

            )}

            {showMisChats && (
                <div>
                    <div className="fixed bottom-10 bg-red-400 right-2 w-8 p-1 rounded-4xl shadow-lg z-60">
                        <div className="flex justify-center">
                            <h1 className="flex">2</h1>
                        </div>
                    </div>
                    <button className="fixed bottom-4 right-4 w-60 p-2 rounded-lg shadow-lg z-50
                    bg-gray-800
                    hover:bg-gray-600
                    hover:cursor-pointer"
                            onClick={() => {
                                setOpenChats(!openChats);
                            }}>
                        <h1 className="font-semibold text-center text-white">Mis chats</h1>
                        {/* Aquí iría el contenido del chat */}
                    </button>
                </div>
            )}

        </div>

    );
};

export default Chats;