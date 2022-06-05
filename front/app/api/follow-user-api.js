import axios from 'axios';
import { API_BASE_URL } from './api-manager';

const FOLLOW_USER_URL = `${API_BASE_URL}follow-user/`;

export const getFollowUser = async userId => {
    return axios.get(`${FOLLOW_USER_URL}${userId}`);
};

export const createFollowUser = async userId => {
    return axios.post(FOLLOW_USER_URL, { userId });
};

export const deleteFollowUser = async userId => {
    return axios.delete(`${FOLLOW_USER_URL}${userId}`);
};

export const getAllFollowUsers = async () => {
    return axios.get(FOLLOW_USER_URL);
};

export const getAllFollowUserAlerts = async () => {
    return axios.get(`${FOLLOW_USER_URL}alerts`);
};

export const resetFollowUser = async userId => {
    return axios.post(`${FOLLOW_USER_URL}alerts/${userId}`);
};
