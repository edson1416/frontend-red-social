import React, {useContext} from 'react';
import NavBar from "./NavBar.jsx";
import SideBar from "./SideBar.jsx";
import BodyPage from "./BodyPage.jsx";
import Chats from "../chat/Chats.jsx";
import MiPerfil from "../perfil/MiPerfil.jsx";
import {useAuth} from "../../auth/useAuth.js";
import {Navigate} from "react-router-dom";

const PageHome = () => {
    const {user} = useAuth();
    console.log(user);
    return (
        <div className="">
            <NavBar usuario={user}></NavBar>
            <div className="flex flex-row justify-between">
                <BodyPage></BodyPage>
                {/*<MiPerfil></MiPerfil>*/}
            </div>
            <Chats id_usuario={user.id}></Chats>
        </div>
    );
};

export default PageHome;