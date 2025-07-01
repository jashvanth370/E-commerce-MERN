import axios from 'axios';

const API_URL = 'http://localhost:8089/api/users';

export const getProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user', error);
        throw error;
    }
}
