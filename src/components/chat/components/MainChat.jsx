import React from 'react';
import Brightness1Icon from "@mui/icons-material/Brightness1";
import HideSourceIcon from "@mui/icons-material/HideSource";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import {format} from "date-fns";
import {es} from "date-fns/locale";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const MainChat = ({
                      miembro,
                      mensajes,
                      id_usuario,
                      mensajeFinal,
                      nuevoMensaje,
                      setNuevoMensaje,
                      enviarMensaje,
                      handleCloseChat,
                      chat_id
                  }) => {

    return (
        <div className="bg-gray-100 fixed bottom-4 right-2
                        w-72 rounded-lg shadow-lg z-50">
            <div className="flex flex-col bg-gray-900 mb-3 items-center rounded-t-lg p-2">
                <div className="flex justify-between w-full">
                    {miembro.conectado ?
                        <Brightness1Icon fontSize="small" sx={{color: 'green'}}></Brightness1Icon>
                        :
                        <HideSourceIcon fontSize="small" sx={{color: 'red'}}></HideSourceIcon>
                    }

                    <h1 className="font-semibold text-white">
                        {miembro.nombreMiembro}
                    </h1>
                    <button className="hover:cursor-pointer" onClick={()=>{handleCloseChat(chat_id)}}>
                        <HighlightOffRoundedIcon sx={{color: 'white'}}></HighlightOffRoundedIcon>
                    </button>
                </div>
                <div>
                    {miembro.conectado ?
                        <h1 className="text-xs text-white">enlínea</h1>
                        :
                        <h1 className="text-xs text-white">
                            {miembro.ultimaConexion ?
                                format(new Date(miembro.ultimaConexion), 'dd MMM, HH:mm', {locale: es})
                                :
                                "no hay conexion"
                            }
                        </h1>
                    }

                </div>

            </div>
            <div className="space-y-3 overflow-y-auto h-80 p-2">

                {mensajes.length > 0 ? mensajes.map((mensaje) => {

                        if (mensaje.autor.id === id_usuario) {
                            return (
                                <div key={mensaje.id} className="flex justify-end">
                                    <div className="flex flex-col w-2/3">
                                        <div
                                            className="flex flex-col bg-gray-900 text-white w-full p-2 rounded-lg overflow-hidden break-words">
                                            <h1>{mensaje.mensaje}</h1>
                                            <div className="flex justify-end">
                                                <h2 className="font-thin text-xs">
                                                    {
                                                        format(new Date(mensaje.created_at), 'dd MMM, HH:mm', {locale: es})
                                                    }
                                                </h2>
                                            </div>
                                        </div>
                                        {
                                            mensaje.visto ?
                                                <h1 className="text-xs text-blue-800 ml-1">leído</h1>
                                                : <h1 className="text-xs ml-1">entregado</h1>
                                        }

                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={mensaje.id} className="flex flex-col">
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
                       onChange={e => setNuevoMensaje(e.target.value)}
                       onKeyDown={e => e.key === 'Enter' && enviarMensaje()}/>

                <button className="hover:cursor-pointer bg-gray-900 p-1 text-white rounded-md shadow-md"
                        onClick={enviarMensaje}>
                    <SendRoundedIcon/>
                </button>
            </div>
        </div>
    );
};

export default MainChat;