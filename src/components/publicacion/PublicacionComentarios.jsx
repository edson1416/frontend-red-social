import React from 'react';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const PublicacionComentarios = () => {
    return (
        <div className="p-2">
            <div className="bg-white flex flex-col p-2 items-start w-full shadow-md">
                {/*Encabezado*/}
                <div className="flex items-center space-x-2">
                    <AccountCircleIcon fontSize="large" />
                    <div className="flex flex-col items-start">
                        <h1>Edson Sarmiento</h1>
                    </div>
                </div>

                {/*Cuerpo*/}
                <div className="flex text-start ml-2">
                    <h1>Mi comentarioo xd.</h1>
                </div>

                {/*pie*/}
                <div className="flex p-1 w-full">
                    <h2 className="font-light text-xs">25/06/2025</h2>
                </div>
            </div>
        </div>
    );
};

export default PublicacionComentarios;