import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PublicacionComentarios from "./PublicacionComentarios.jsx";

const Publicacion = () => {
    const [openComentarios, setOpenComentarios] = React.useState(false);
    return (
        <div className="bg-gray-100 w-5/6 rounded p-1">
            <div className="flex flex-col space-y-3 text-center p-4 bg-white rounded shadow-md">

                {/*Encabezado*/}
                <div className="flex items-center space-x-2">
                    <AccountCircleIcon fontSize="large" />
                    <div className="flex flex-col items-start">
                        <h1>Edson Sarmiento</h1>
                        <h2 className="font-light text-xs">25/06/2025</h2>
                    </div>
                </div>

                {/*Cuerpo*/}
                <div className="flex text-start">
                    <h1>Mi nombre es Maximo Decimo Meridio comandante de los Ejércitos
                        del Norte, General de las Legiones Fénix, fiel servidor del verdadero Emperador Marco Aurelio.
                        Padre de un hijo asesinado, esposo de una esposa asesinada y juro que me vengaré,
                        en esta vida o en la otra.
                    </h1>
                </div>

                {/*Imagen si es que hay*/}
                <div className="flex justify-center my-2">
                    <img className="w-full h-96 object-cover" src="/src/assets/images/star.jpg" alt="imgxd"></img>
                </div>

                {/*Botones de reaccion*/}
                <div className="flex mt-2 space-x-4">
                    <button className="hover:cursor-pointer">
                        <FavoriteBorderIcon fontSize="medium" />
                    </button>
                    <button className="hover:cursor-pointer" onClick={()=>setOpenComentarios(!openComentarios)}>
                        <CommentIcon fontSize="medium" />
                    </button>
                </div>

                {/*Comentarios*/}
                {openComentarios &&(
                    <div>
                        <PublicacionComentarios />
                        <PublicacionComentarios />
                    </div>
                )}

                <div className="flex space-x-3 justify-center">
                    <input className="bg-white p-2 rounded-md shadow-md w-full placeholder:text-gray-500" type="text" placeholder="comentar..." />
                    <button className="hover:cursor-pointer bg-gray-900 text-white p-1 rounded-md shadow-md">
                        Comentar
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Publicacion;