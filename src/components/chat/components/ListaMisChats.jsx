import React from 'react';
import Brightness1Icon from "@mui/icons-material/Brightness1";
import HideSourceIcon from "@mui/icons-material/HideSource";
import {useMisChats} from "../../../hooks/chats-hook.js";

const ListaMisChats = ({openChats, id_usuario, handleopenChat}) => {

    const {misChats, cargando} = useMisChats(openChats);

    return (
        <div className="bg-gray-200 space-y-2 fixed bottom-20 right-4
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
                                                    onClick={() => handleopenChat(item.chat_id, miembro.user.name,miembro.user.conectado,miembro.user.fecha_ultima_conexion)}>
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


        </div>
    );
};

export default ListaMisChats;