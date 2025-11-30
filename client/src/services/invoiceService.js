import api from './api';

const invoiceService = {
    getAll: async () => {
        const response = await api.get('/invoices');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/invoices/${id}`);
        return response.data;
    },

    create: async (invoiceData) => {
        const response = await api.post('/invoices', invoiceData);
        return response.data;
    },

    update: async (id, invoiceData) => {
        const response = await api.put(`/invoices/${id}`, invoiceData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/invoices/${id}`);
        return response.data;
    }
};

export default invoiceService;
