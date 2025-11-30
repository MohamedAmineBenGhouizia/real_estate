import React, { useState, useEffect } from 'react';
import reservationService from '../../services/reservationService';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    Tooltip,
} from '@mui/material';
import { CheckCircle as CheckIcon, Cancel as CancelIcon } from '@mui/icons-material';

const ReservationsManagement = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const data = await reservationService.getAll();
                setReservations(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchReservations();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            await reservationService.updateStatus(id, status);
            setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
        } catch (err) {
            alert('Failed to update status');
        }
    };

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                Reservations
            </Typography>

            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: 'background.default' }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Property</TableCell>
                            <TableCell>Dates</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations.map((res) => (
                            <TableRow key={res.id}>
                                <TableCell>#{res.id}</TableCell>
                                <TableCell>{res.User?.name}</TableCell>
                                <TableCell>{res.Property?.title}</TableCell>
                                <TableCell>
                                    {new Date(res.startDate).toLocaleDateString()} - {new Date(res.endDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={res.status}
                                        color={res.status === 'confirmed' ? 'success' : res.status === 'cancelled' ? 'error' : 'warning'}
                                        size="small"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    {res.status === 'pending' && (
                                        <>
                                            <Tooltip title="Confirm">
                                                <IconButton color="success" onClick={() => handleStatusUpdate(res.id, 'confirmed')}>
                                                    <CheckIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Cancel">
                                                <IconButton color="error" onClick={() => handleStatusUpdate(res.id, 'cancelled')}>
                                                    <CancelIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ReservationsManagement;
