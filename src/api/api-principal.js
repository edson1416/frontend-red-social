import axios from "axios";


const apiPrincipal = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: { "Content-Type": "application/json" },
})

export const setAuthToken = (token) => {
    apiPrincipal.defaults.headers.authorization = `Bearer ${token}`;
}

export const removeAuthToken = () => {
    delete apiPrincipal.defaults.headers.authorization;
}

export default apiPrincipal