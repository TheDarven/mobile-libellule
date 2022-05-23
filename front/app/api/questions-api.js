import axios from 'axios';
import { API_BASE_URL } from './api-manager';

const API_QUESTIONS_URL = `${API_BASE_URL}questions/`;

export const getAllQuestions = async () => {
    return axios.get(API_QUESTIONS_URL);
};

export const getQuestionById = async (questionId) => {
    return axios.get(`${API_QUESTIONS_URL}${questionId}`);
}
