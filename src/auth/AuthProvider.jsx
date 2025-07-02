import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {removeAuthToken, setAuthToken} from "../api/api-principal.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decode = jwtDecode(token);
                setUser(decode);
                console.log(decode);
            } catch (err) {
                console.log("Token inválido:", err);
                localStorage.removeItem("token");
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (token) => {
        localStorage.setItem("token", token);
        if (token) setAuthToken(token);
        const decode = jwtDecode(token);
        setUser(decode);
    };

    const logout = async () => {
        localStorage.removeItem("token");
        removeAuthToken();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
