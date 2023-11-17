import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

// Register user
const register = async (userData) => {

    const response = await axios.post(`${baseURL}/usuarios`, userData);
    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        ToastChakra('Usuario registrado', 'Bienvenido a la plataforma', 'success', 2500, 'top-right');
    }

    return response.data;
}

// Login user
const login = async (userData) => {
    
        const response = await axios.post(`${baseURL}/auth/login`, userData);

        if(response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            ToastChakra('BIENVENIDO A LA PLATAFORMA', 'CARGANDO LOS DATOS ...', 'loading', 3500, 'top-right');
            return response.data;
        }
    
}

// Logout user
const logout = () => {
    ToastChakra('CERRANDO SESIÓN ...', 'HASTA PRONTO, TE ESPERAMOS!', 'loading', 2000, 'top-right');
    localStorage.removeItem("user");
    localStorage.removeItem("expanded_value");
    window.location.reload();
}

const authService = {
    register,
    login,
    logout
}

export default authService;