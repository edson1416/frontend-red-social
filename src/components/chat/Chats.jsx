import React, {useEffect} from 'react';
import socket from '/src/util/socket.js'
import {format} from "date-fns";
import {es} from "date-fns/locale";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const Chats = ({id_usuario}) => {
    console.log("El id del usuario:",id_usuario);
    const idUsuario =1;
    const [openChats, setOpenChats] = React.useState(false);
    const [openChat, setOpenChat] = React.useState(false);
    const [showMisChats, setShowMisChat] = React.useState(true);

    const [mensajes, setMensajes] = React.useState([]);
    const [nuevoMensaje, setNuevoMensaje] = React.useState('');

    const cargarMensaje = (data) => {
        setMensajes(data);
    }

    const mensajeRecibido = (data) => {
        setMensajes((prev) => [...prev, data]);
    }

    useEffect(() => {
        if (!socket.connected) {
            socket.connect()
        }

        socket.on('mensaje_recibido', mensajeRecibido)
        socket.on('cargar_mensajes', cargarMensaje)

        return () => {
            socket.off('mensaje_recibido', mensajeRecibido);
        };
    },[socket])

    const abrirChat = () => {
        setOpenChat(true);

        socket.emit('entrar_chat', "1");

        setOpenChats(false);
        setShowMisChat(false);
    }

    const enviarMensaje = async () => {
        if(nuevoMensaje !== '') {
            const info = {
                mensaje: nuevoMensaje,
                chat_id: 1,
                user_id: 1,
            }

            await socket.emit('enviar_mensaje',info)
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
                <div className="flex w-full bg-white p-2 rounded-lg justify-between hover:bg-gray-600 hover:text-white hover:cursor-pointer">
                    <button className="flex w-full hover:cursor-pointer"
                            onClick={() => abrirChat()}>
                        Yessenia Cruz
                    </button>
                    <div className="flex bg-red-400 w-6 justify-center rounded-4xl">
                        <h1>2</h1>
                    </div>

                </div>

            </div>)}

            {/*Chat en especifico*/}
            {openChat && (
                <div className="bg-gray-100 fixed bottom-20 right-4
                        w-72 rounded-lg shadow-lg z-50">
                    <div className="flex bg-gray-900 mb-3 justify-between items-center rounded-t-lg p-2">
                        <h1 className="font-semibold text-white">Yessenia Cruz</h1>
                        <button className="hover:cursor-pointer" onClick={() => {
                            setOpenChat(false)
                            setShowMisChat(true)
                        }}>
                            <HighlightOffRoundedIcon sx={{color: 'white'}}></HighlightOffRoundedIcon>
                        </button>
                    </div>
                    <div className="space-y-2 overflow-y-auto h-80 p-2">

                        {mensajes.length > 0 ? mensajes.map((mensaje) => {

                                    if(mensaje.autor.id === idUsuario){
                                        return (
                                            <div key={mensaje.id} className="flex justify-end">
                                                <div
                                                    className="flex flex-col bg-gray-900 text-white w-2/3 p-2 rounded-lg overflow-hidden break-words">
                                                    <h1>{mensaje.mensaje}</h1>
                                                    <div className="flex justify-end">
                                                        <h2 className="font-thin text-xs">
                                                            {
                                                                format(new Date(mensaje.created_at), 'dd MMM, HH:mm',{locale: es})
                                                            }
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }else{
                                        return (
                                            <div key={mensaje.id} className="flex">
                                                <div className="flex flex-col bg-white w-2/3 p-2 rounded-lg overflow-hidden break-words">
                                                    <h1>{mensaje.mensaje}</h1>
                                                    <div className="flex justify-end">
                                                        <h2 className="font-thin text-xs">
                                                            {
                                                                format(new Date(mensaje.created_at), 'dd MMM, HH:mm',{locale: es})
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
                    </div>

                    {/*Escribir mensaje*/}
                    <div className="flex space-x-3 justify-center p-2">
                        <input className="bg-white rounded-md shadow-md w-full p-1 placeholder:text-gray-500"
                               type="text" placeholder="message..."
                               value={nuevoMensaje}
                               onChange={e=> setNuevoMensaje(e.target.value)}/>
                        <button className="hover:cursor-pointer bg-gray-900 p-1 text-white rounded-md shadow-md" onClick={enviarMensaje}>
                            <SendRoundedIcon />
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
                                setOpenChats(!openChats)
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