import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/users/';

export const login = async (name, password) => {
    return axios.post(
        `${API_BASE_URL}login`,
        { name, password },
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }
    );
};
