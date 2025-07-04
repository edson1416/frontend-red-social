import api from "/src/api/auth-api.js";
import apiPrincipal from "../api/api-principal.js";

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials,{
        headers: { "Content-Type": "application/json" },
        //withCredentials: true
    });
    const token = response.data.jwt; // el token del backend
    localStorage.setItem("token", token);

    return response.data.jwt;
}

export const cerrarSesion = async () => {
     await apiPrincipal.post('/usuario/desconectar').then(() => {
         console.log('desconectado');
     }).catch((error) => {
         console.log(error);
     });
}