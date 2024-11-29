import axios from 'axios';

const axiosConfig = {
    baseURL: "https://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    }
};

const http = axios.create(axiosConfig);

export default http;