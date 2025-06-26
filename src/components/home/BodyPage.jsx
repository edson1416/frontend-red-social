import React from 'react';
import Publicacion from "../publicacion/Publicacion.jsx";

const BodyPage = () => {
    return (
        <div className="flex flex-col h-screen items-center pt-20 w-full p-4 space-y-4">
            <div className="flex flex-col w-2/3 items-center space-y-6 p-3">
                <Publicacion></Publicacion>
            </div>
        </div>
    );
};

export default BodyPage;