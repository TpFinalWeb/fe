import axios from 'axios';

const axiosConfig = {
    baseURL: "https://localhost:3005",
    headers: {
        "Content-Type": "application/json",
    },
};

const apiClient = axios.create(axiosConfig);

apiClient.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token'); // Get the token from local storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export function setToken(token: string){
    try {
        localStorage.setItem('token', token);
    } catch (error) {
        console.log(error);
    }
}

export function getToken(){
    try {
        const token = localStorage.getItem('token');
        return token;
    } catch (error) {
        console.log(error);
    }
}

export function removeToken(){
    try {
        localStorage.removeItem('token');
        const token = localStorage.getItem('token');
        return token === null;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export default apiClient;