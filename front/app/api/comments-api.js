import axios from 'axios';
import { API_BASE_URL } from './api-manager';

const API_COMMENTS_URL = `${API_BASE_URL}comments/`;

export const createComment = async (questionId, content) => {
    return axios.post(`${API_COMMENTS_URL}questions/${questionId}`, {
        content
    });
};

export const getCommentsOfQuestion = async questionId => {
    return axios.get(`${API_COMMENTS_URL}questions/${questionId}`);
};

export const deleteComment = async commentId => {
    return axios.delete(`${API_COMMENTS_URL}${commentId}`);
};
