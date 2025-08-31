import axios from 'axios';

const API_URL = 'http://localhost:8089/api/auth';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data; // Assuming the response contains the token
    } catch (error) {
        console.error('Login error:', error);
        throw error.response ? error.response.data : new Error('Network error');
    }
}

export const register = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error.response ? error.response.data : new Error('Network error');
    }
}