import apiPrincipal from "../api/api-principal.js";

export const buscarUsuario = async () => {
    const response = await apiPrincipal('/user');
    return response.data;
}