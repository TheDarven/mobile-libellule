export const API_BASE_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://libellule-production.herokuapp.com/api/'
        : 'http://localhost:3000/api/';
