import api from './api';

const userService = {
    getProfile: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    updateProfile: async (userData) => {
        const response = await api.put('/auth/profile', userData);
        return response.data;
    },

    getAllUsers: async () => { // Admin only
        const response = await api.get('/users');
        return response.data;
    }
};

export default userService;
