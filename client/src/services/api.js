import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to include the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// AI Helpers
export const aiService = {
    generateSummary: async (jobTitle, experience) => {
        const res = await api.post('/ai/summary', { jobTitle, experience });
        return res.data.summary;
    },
    improveText: async (text, type) => {
        const res = await api.post('/ai/improve', { text, type });
        return res.data.improvedText;
    },
    suggestSkills: async (jobTitle) => {
        const res = await api.post('/ai/skills', { jobTitle });
        return res.data.skills;
    }
};

export default api;
