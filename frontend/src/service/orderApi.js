import axios from 'axios';

const API_URL = 'http://localhost:8089/api/orders';

// Get auth token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Create axios instance with auth header
const createAuthInstance = () => {
    const token = getAuthToken();
    return axios.create({
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

export const createOrder = async (orderData) => {
    try {
        const authInstance = createAuthInstance();
        const response = await authInstance.post(`${API_URL}/createOrder`, orderData);
        return response.data;
    } catch (error) {
        console.error('Create order error:', error);
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const getUserOrders = async () => {
    try {
        const authInstance = createAuthInstance();
        const response = await authInstance.get(`${API_URL}/getOrdersByUserId`);
        return response.data;
    } catch (error) {
        console.error('Get user orders error:', error);
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const getAllOrders = async () => {
    try {
        const authInstance = createAuthInstance();
        const response = await authInstance.get(`${API_URL}/getAllOrders`);
        return response.data;
    } catch (error) {
        console.error('Get all orders error:', error);
        throw error.response ? error.response.data : new Error('Network error');
    }
}; 