import api from "/src/api/axios.js";

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials,{
        headers: { "Content-Type": "application/json" },
        //withCredentials: true
    });
    const token = response.data.jwt; // el token del backend
    localStorage.setItem("token", token);

    return response.data.jwt;
}