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
};

export default invoiceService;
