import axios from 'axios';
import localForage from 'localforage';

const axiosConfig = {
    baseURL: "https://localhost:3005",
    headers: {
        "Content-Type": "application/json",
    },
};

const apiClient = axios.create(axiosConfig);

apiClient.interceptors.request.use(
    async (config) => {
        const token = await getToken(); // Get the token from local storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export async function setToken(token: string){
    try{
        await localForage.setItem('token', token);
    }catch(error){
        console.log(error);
    }
}

export async function getToken(){
    try{
        const token = await localForage.getItem('token') as JSON;
        if(token){
            return token['token'];
        }
    }catch(error){
        console.log(error);
    }
}

export async function removeToken(){
    try{
        await localForage.removeItem('token');
    }catch(error){
        console.log(error);
    }
}
export default apiClient;