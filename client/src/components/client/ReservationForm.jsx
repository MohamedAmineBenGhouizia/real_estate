import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import reservationService from '../../services/reservationService';
import { AuthContext } from '../../context/AuthContext';
import { NotificationContext } from '../../context/NotificationContext';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Divider,
    Stack,
    Alert,
} from '@mui/material';
import { DateRange as DateRangeIcon } from '@mui/icons-material';

const ReservationForm = ({ property }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const notify = useContext(NotificationContext);
    const navigate = useNavigate();

    const calculateTotal = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays * property.price : 0;
    };

    const total = calculateTotal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setLoading(true);
        try {
            await reservationService.create({
                propertyId: property.id,
                startDate,
                endDate,
            });
            notify.success('Reservation created successfully!');
            navigate('/my-reservations');
        } catch (error) {
            notify.error(error.response?.data?.message || 'Failed to create reservation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                ${property.price} <Typography component="span" variant="body1" color="text.secondary">/ night</Typography>
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        label="Check-in"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Check-out"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        required
                    />

                    {total > 0 && (
                        <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="body1">Total Price:</Typography>
                                <Typography variant="h6" fontWeight="bold" color="primary">
                                    ${total.toLocaleString()}
                                </Typography>
                            </Stack>
                        </Box>
                    )}

                    {!user && (
                        <Alert severity="info">Please login to make a reservation.</Alert>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size="large"
                        fullWidth
                        disabled={loading}
                        startIcon={<DateRangeIcon />}
                        sx={{ py: 1.5, fontWeight: 'bold' }}
                    >
                        {loading ? 'Processing...' : 'Reserve Now'}
                    </Button>
                </Stack>
            </Box>
        </Paper>
    );
};

export default ReservationForm;
