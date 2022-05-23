import axios from 'axios';
import { API_BASE_URL } from './api-manager';

const API_USERS_URL = `${API_BASE_URL}users/`;

export const login = async (name, password) => {
    return axios.post(`${API_USERS_URL}login`, { name, password });
};

export const signUp = async (name, password) => {
    return axios.post(API_USERS_URL, { name, password });
};

export const whoAmI = async () => {
    return axios.get(`${API_USERS_URL}whoami`);
};
