import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {login as loginRequest} from "../../../auth/auth-service.js";
import {useAuth} from "../../../auth/useAuth.js";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth();

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginRequest({email, password});
            login(response);
            navigate("/home");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="shadow-lg shadow-white p-6 md:w-3/4 sm:w-full h-3/4 rounded-2xl text-white space-y-3">
            <div className="flex justify-center">
                <h1 className="text-3xl font-bold">Iniciar sesion</h1>
            </div>
            <div className="flex flex-col space-y-2 p-4">
                <label className="">Email</label>
                <input className="bg-white text-black p-2 rounded-md shadow-sm placeholder:text-gray-500"
                       type="text"
                       placeholder="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="flex flex-col space-y-2 p-4">
                <label className="">Password</label>
                <input className="bg-white text-black p-2 rounded-md shadow-sm placeholder:text-gray-500"
                       type="password"
                       placeholder="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="flex flex-col space-y-3 p-4">
                <input type="submit"
                       className="bg-black text-white border p-2 w-1/2 rounded-lg cursor-pointer hover:bg-gray-900"
                       value="Login"
                       onClick={handleLogin}/>
                <p className="font-light ml-2">Olvidaste tu contraseña ?</p>
                <p className="font-sans ml-2">Aun no tienes una cuenta, registrate en este <a
                    className="text-blue-500 cursor-pointer underline" href="/">enlace</a></p>
            </div>
        </div>
    );
};

export default Login;