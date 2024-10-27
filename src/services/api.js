import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.trendmingle.com',
});

export const fetchProducts = () => api.get('/products');
export const loginUser = (data) => api.post('/auth/login', data);
export const signupUser = (data) => api.post('/auth/signup', data);
// Add more API functions as needed

export default api;
