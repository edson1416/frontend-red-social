import React from 'react';
import NavBar from "./NavBar.jsx";
import BodyPage from "./BodyPage.jsx";
import Chats from "../chat/Chats.jsx";
import {useAuth} from "../../auth/useAuth.js";
import FormPublicacion from "./FormPublicacion.jsx";

const PageHome = () => {
    const {user} = useAuth();
    return (
        <div className="">
            <NavBar usuario={user}></NavBar>
            <div className="flex flex-col">
                <FormPublicacion></FormPublicacion>
                <BodyPage></BodyPage>
                {/*<MiPerfil></MiPerfil>*/}
            </div>
            <Chats id_usuario={user.id}></Chats>
        </div>
    );
};

export default PageHome;