import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/users/';

export const login = async (name, password) => {
    return axios.post(`${API_BASE_URL}login`, { name, password });
};

export const signUp = async (name, password) => {
    return axios.post(API_BASE_URL, { name, password });
};

export const whoAmI = async () => {
    return axios.get(`${API_BASE_URL}whoami`);
};
