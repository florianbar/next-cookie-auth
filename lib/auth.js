import axios from 'axios';

// pass cookie data to axios
axios.defaults.withCredentials = true;

export const loginUser = async (email, password) => {
    const response = await axios.post('/api/login', { email, password });
    console.log("fdsfds", response.data);
};

export const getUserProfile = async () => {
    const response = await axios.get('/api/profile');
    return response.data;
};