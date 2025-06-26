import React from 'react';
import Login from "./login/Login.jsx";

const PaginaInicio = () => {
    return (
        <div className="flex flex-row justify-start min-h-screen bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('/src/assets/images/star.jpg')" }}>
            <div className="flex flex-row justify-center items-center md:w-1/2  sm:w-3/4 lg:w-1/2">
                <Login></Login>
            </div>
            <div className="text-white flex flex-col justify-center items-center">
                <p className="font-bold text-6xl mb-6">Bienvenidos !!</p>
                <p className="font-bold text-2xl">A esta practica de red social, la cual fue desarrollada</p>
                <p className="font-bold text-2xl">con el unico objetivo de aprender conocimientos adquiridos</p>
                <p className="font-bold text-2xl">y agracias a ellos poder llamarme Chosen One xd</p>
                <p className="font-bold">otra manera de decirme fullstack xd</p>
            </div>
        </div>
    );
};

export default PaginaInicio;