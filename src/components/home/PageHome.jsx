import React, {useContext} from 'react';
import NavBar from "./NavBar.jsx";
import SideBar from "./SideBar.jsx";
import BodyPage from "./BodyPage.jsx";
import Chats from "../chat/Chats.jsx";
import MiPerfil from "../perfil/MiPerfil.jsx";
import {useAuth} from "../../auth/useAuth.js";
import {Navigate} from "react-router-dom";

const PageHome = () => {
    return (
        <div className="">
            <NavBar></NavBar>
            <div className="flex flex-row justify-between">
                <BodyPage></BodyPage>
                <p></p>
                {/*<MiPerfil></MiPerfil>*/}
            </div>
            <Chats></Chats>
        </div>
    );
};

export default PageHome;