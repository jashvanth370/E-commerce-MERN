import axios from 'axios';

const API_URL = 'http://localhost:8089/api/products';

export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllProducts`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}