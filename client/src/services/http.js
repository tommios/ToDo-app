import axios from "axios";

const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

client.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`
        }
    }

    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default client;
