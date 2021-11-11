import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

const generateRandomNumber = max => {
    return Math.floor(Math.random() * (max - 1 + 1)) + 1;
}

export {
    api,
    generateRandomNumber
}