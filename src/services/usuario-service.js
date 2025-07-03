import apiPrincipal from "../api/api-principal.js";

export const buscarUsuario = async () => {
    const response = await apiPrincipal('/user');
    return response.data;
}

export const chatsUsuario = async () => {
    const response = await apiPrincipal('/chats/mis-chats');
    return response.data;
}