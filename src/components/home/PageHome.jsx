import React from 'react';
import NavBar from "./NavBar.jsx";
import SideBar from "./SideBar.jsx";
import BodyPage from "./BodyPage.jsx";
import Chats from "../chat/Chats.jsx";

const PageHome = () => {
    return (
        <div className="">
            <NavBar></NavBar>
            <div className="flex flex-row justify-between">
                <BodyPage></BodyPage>
            </div>
            <Chats></Chats>
        </div>
    );
};

export default PageHome;