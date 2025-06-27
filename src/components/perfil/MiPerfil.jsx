import React from 'react';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Publicacion from "../publicacion/Publicacion.jsx";

const MiPerfil = () => {
    return (
        <div className="flex flex-col items-center pt-20 w-full p-4 space-y-4">
            <div className="flex flex-row w-2/3 p-6 bg-gray-100 shadow-md rounded-md">
                <div className="flex flex-col w-1/3 space-y-6">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold">Edson Sarmiento</h1>
                        <h2 className="font-thin">edsonariel.sarmiento@gmail.com</h2>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="flex flex-row space-x-2">
                            <h1 className="font-semibold">Direccion: </h1>
                            <h1 className="">Col. Costa Rica Av.</h1>
                        </div>
                        <div className="flex flex-row space-x-2">
                            <h1 className="font-semibold">Telefono: </h1>
                            <h1 className="">7898-7898</h1>
                        </div>

                    </div>
                </div>
                <div className="flex flex-col w-2/3 space-y-2 rounded-md shadow p-2 bg-white">
                    <h1>Edsfas</h1>
                </div>
            </div>
            <h1 className="text-2xl font-semibold">Mis publicaciones</h1>
            <div className="flex flex-col w-2/3 items-center space-y-6 p-3">
                <Publicacion></Publicacion>
            </div>

        </div>
    );
};

export default MiPerfil;