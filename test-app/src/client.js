import axios from 'axios';

const API_URL = 'https://www.reddit.com/';

export const client = {
    get: async (url, params) => {
        try {
            const result = await axios.get(`${API_URL}${url}`, params);
            const { data } = result.data;
            return data;
        } catch (e) {
            throw e;
        }
    },
    post: async (url, body) => {
        try {
            const result = await axios.post(url, body);
            const { data } = result.data;
            return data;
        } catch (e) {
            throw e;
        }
    },
};
