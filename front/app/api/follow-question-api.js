import axios from 'axios';
import { API_BASE_URL } from './api-manager';

const FOLLOW_QUESTION_URL = `${API_BASE_URL}follow-question/`;

export const getFollowOfQuestion = async questionId => {
    return axios.get(`${FOLLOW_QUESTION_URL}${questionId}`);
};

export const createFollowQuestion = async questionId => {
    return axios.post(FOLLOW_QUESTION_URL, { questionId });
};

export const deleteFollowQuestion = async questionId => {
    return axios.delete(`${FOLLOW_QUESTION_URL}${questionId}`);
};

export const getAllFollowQuestions = async () => {
    return axios.get(`${FOLLOW_QUESTION_URL}`);
};

export const getAllFollowQuestionAlerts = async () => {
    return axios.get(`${FOLLOW_QUESTION_URL}alerts`);
};
