import api from './api';

const propertyService = {
    getAll: async (params) => {
        const response = await api.get('/properties', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/properties/${id}`);
        return response.data;
    },

    create: async (propertyData) => {
        // Handle FormData for image uploads
        const response = await api.post('/properties', propertyData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    update: async (id, propertyData) => {
        const response = await api.put(`/properties/${id}`, propertyData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/properties/${id}`);
        return response.data;
    },
};

export default propertyService;
