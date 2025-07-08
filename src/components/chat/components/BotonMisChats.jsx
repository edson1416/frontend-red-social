import React from 'react';

const BotonMisChats = ({setOpenChats, openChats}) => {

    return (
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
            </button>
        </div>
    );
};

export default BotonMisChats;