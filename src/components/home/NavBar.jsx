import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavBar = ({usuario}) => {

    const [menuOpen, setMenuOpen] = React.useState(false);
    const [dropDown, setDropDown] = React.useState(false);
    return (
        <div className="bg-gray-900 fixed w-full text-white shadow-xl z-50">
            <div className="flex items-center justify-between p-3">
                {/* Logo */}
                <div className="w-1/3 md:w-1/5">LOGO</div>

                {/* Desktop Menu */}
                <div className="hidden md:flex flex-row justify-center space-x-6 w-3/5">
                    <div className="flex items-center space-x-2">
                        <h1>Amigos</h1>
                        <GroupIcon />
                    </div>
                    <div className="flex items-center space-x-2">
                        <h1>Notificaciones</h1>
                        <NotificationsIcon />
                    </div>
                </div>

                {/* User Info */}
                <div className="hidden md:flex items-center justify-end space-x-4 w-1/5">
                    <div className="flex items-center">
                        <div className="flex items-center space-x-2 hover:bg-gray-800">
                            <h1>{usuario.sub}</h1>
                            <button className="hover:cursor-pointer" onClick={() => setDropDown(!dropDown)}>
                                <AccountCircleIcon fontSize="large" />
                            </button>
                        </div>

                        {dropDown && (
                            <div className="absolute right-0 top-13 mt-2 w-48 bg-white text-black rounded shadow-lg py-2 z-50 transition-all duration-200">
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Perfil</button>
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Cerrar sesión</button>
                            </div>
                        )}
                    </div>

                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden flex flex-col items-start px-4 pb-4 space-y-4 bg-gray-800 text-sm">
                    <div className="flex items-center space-x-2">
                        <GroupIcon />
                        <span>Amigos</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <NotificationsIcon />
                        <span>Notificaciones</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <AccountCircleIcon />
                        <span>Edson Sarmiento</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;