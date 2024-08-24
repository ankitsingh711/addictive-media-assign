import axios from 'axios';

const api = axios.create({
    baseURL: 'https://addictive-media-assign.onrender.com',
});

export default api;
