import React from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const FormPublicacion = () => {
    return (
        <div className="flex flex-col fixed bg-white items-center pt-18 p-4 w-full">
            <div className="flex flex-col p-4 shadow-lg w-1/2 rounded-lg space-y-2">
                <input className="bg-white p-2 border rounded-md border-gray-400" type="text" placeholder="¿que estas pensando?"></input>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row space-x-3 text-gray-600">
                        <button className="flex flex-row hover:bg-gray-100 space-x-2 p-1 shadow-sm rounded-md hover:cursor-pointer">
                            <AddPhotoAlternateIcon></AddPhotoAlternateIcon>
                            <h1>Agregar imagen</h1>
                        </button>
                        <button className="flex flex-row hover:bg-gray-100 space-x-2 p-1 shadow-sm rounded-md hover:cursor-pointer">
                            <AdminPanelSettingsIcon></AdminPanelSettingsIcon>
                            <h1>Privacidad</h1>
                        </button>
                    </div>
                    <div>
                        <button className="bg-gray-800 text-white p-1 rounded-md w-20 hover:bg-gray-600 hover:cursor-pointer">Publicar</button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default FormPublicacion;