import api from './api';

const reservationService = {
    create: async (reservationData) => {
        const response = await api.post('/reservations', reservationData);
        return response.data;
    },

    getMyReservations: async () => {
        const response = await api.get('/reservations/my');
        return response.data;
    },

    getAll: async () => { // Admin only
        const response = await api.get('/reservations');
        return response.data;
    },

    updateStatus: async (id, status) => {
        const response = await api.patch(`/reservations/${id}/status`, { status });
        return response.data;
    },

    requestModification: async (id, data) => {
        const response = await api.post(`/reservations/${id}/request-modification`, data);
        return response.data;
    },

    approveModification: async (id) => {
        const response = await api.post(`/reservations/${id}/approve-modification`);
        return response.data;
    },

    rejectModification: async (id) => {
        const response = await api.post(`/reservations/${id}/reject-modification`);
        return response.data;
    },
};

export default reservationService;
