import axios from 'axios';
import { API_BASE_URL } from './api-manager';

const FOLLOW_QUESTION_URL = `${API_BASE_URL}follow-question/`;

export const getFollowOfQuestion = async questionId => {
    return axios.get(`${FOLLOW_QUESTION_URL}${questionId}`);
};

export const createFollow = async questionId => {
    return axios.post(FOLLOW_QUESTION_URL, { questionId });
};

export const deleteFollow = async questionId => {
    return axios.delete(`${FOLLOW_QUESTION_URL}${questionId}`);
};
