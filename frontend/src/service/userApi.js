import axios from 'axios';

const API_URL = 'http://localhost:8089/api/users';

export const getProfile = async () => {
    try {
        const token = localStorage.getItem('token'); // or whatever key you use
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user', error);
        throw error;
    }
}

export const updateUser = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/updateUser`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user', error);
        throw error;
    }
}
