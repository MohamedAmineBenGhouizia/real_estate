import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import reservationService from '../../services/reservationService';
import propertyService from '../../services/propertyService';
import { AuthContext } from '../../context/AuthContext';
import { NotificationContext } from '../../context/NotificationContext';
import { formatPrice } from '../../utils/formatPrice';
import {
    Box,
    Typography,
    Button,
    Paper,
    Divider,
    Stack,
    Alert,
    CircularProgress,
    Tooltip
} from '@mui/material';
import { DateRange as DateRangeIcon, Info as InfoIcon } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fr } from 'date-fns/locale';

const ReservationForm = ({ property }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingAvailability, setFetchingAvailability] = useState(true);
    const { user } = useContext(AuthContext);
    const notify = useContext(NotificationContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const data = await propertyService.getAvailability(property.id);
                setBookedDates(data.map(booking => ({
                    start: new Date(booking.startDate),
                    end: new Date(booking.endDate)
                })));
            } catch (error) {
                console.error('Failed to fetch availability', error);
            } finally {
                setFetchingAvailability(false);
            }
        };
        fetchAvailability();
    }, [property.id]);

    const isDateDisabled = (date) => {
        return bookedDates.some(booking => {
            const start = new Date(booking.start);
            const end = new Date(booking.end);
            return date >= start && date <= end;
        });
    };

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

        if (!startDate || !endDate) {
            notify.error('Veuillez sélectionner les dates de séjour');
            return;
        }

        if (startDate >= endDate) {
            notify.error('La date de départ doit être après la date d\'arrivée');
            return;
        }

        // Check for overlap again just in case
        const hasOverlap = bookedDates.some(booking => {
            const start = new Date(booking.start);
            const end = new Date(booking.end);
            return (startDate < end && endDate > start);
        });

        if (hasOverlap) {
            notify.error('Les dates sélectionnées ne sont pas disponibles');
            return;
        }

        setLoading(true);
        try {
            await reservationService.create({
                propertyId: parseInt(property.id),
                startDate,
                endDate,
            });
            notify.success('Réservation créée avec succès !');
            navigate('/my-reservations');
        } catch (error) {
            notify.error(error.response?.data?.message || 'Échec de la réservation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {formatPrice(property.price)} <Typography component="span" variant="body1" color="text.secondary">/ nuit</Typography>
                </Typography>

                <Divider sx={{ my: 2 }} />

                {fetchingAvailability ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress size={24} />
                    </Box>
                ) : (
                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <DatePicker
                                label="Arrivée"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                                disablePast
                                shouldDisableDate={isDateDisabled}
                                slotProps={{ textField: { fullWidth: true, required: true } }}
                            />
                            <DatePicker
                                label="Départ"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                                disablePast
                                minDate={startDate ? new Date(startDate.getTime() + 86400000) : null}
                                shouldDisableDate={isDateDisabled}
                                slotProps={{ textField: { fullWidth: true, required: true } }}
                            />

                            {/* Legend */}
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ fontSize: '0.875rem' }}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'action.disabled' }} />
                                    <Typography variant="caption" color="text.secondary">Indisponible</Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'primary.main' }} />
                                    <Typography variant="caption" color="text.secondary">Sélectionné</Typography>
                                </Stack>
                            </Stack>

                            {total > 0 && (
                                <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body1">Prix Total :</Typography>
                                        <Typography variant="h6" fontWeight="bold" color="primary">
                                            {formatPrice(total)}
                                        </Typography>
                                    </Stack>
                                </Box>
                            )}

                            {!user && (
                                <Alert severity="info">Veuillez vous connecter pour réserver.</Alert>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                size="large"
                                fullWidth
                                disabled={loading || !user}
                                startIcon={<DateRangeIcon />}
                                sx={{ py: 1.5, fontWeight: 'bold' }}
                            >
                                {loading ? 'Traitement...' : 'Réserver Maintenant'}
                            </Button>
                        </Stack>
                    </Box>
                )}
            </Paper>
        </LocalizationProvider>
    );
};

export default ReservationForm;
