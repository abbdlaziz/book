import axios from "axios";

export const api = axios.create({
    baseURL: 'https://47.236.246.176',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});