import React, { useEffect, useState } from 'react';
import reservationService from '../../services/reservationService';
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Box,
    CircularProgress,
} from '@mui/material';

const MyReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const data = await reservationService.getMyReservations();
                setReservations(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchReservations();
    }, []);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                My Reservations
            </Typography>

            {reservations.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary">You have no reservations yet.</Typography>
                </Paper>
            ) : (
                <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="reservations table">
                        <TableHead sx={{ bgcolor: 'background.default' }}>
                            <TableRow>
                                <TableCell fontWeight="bold">Property</TableCell>
                                <TableCell>Check-in</TableCell>
                                <TableCell>Check-out</TableCell>
                                <TableCell>Total Price</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservations.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                        {row.Property?.title}
                                    </TableCell>
                                    <TableCell>{new Date(row.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(row.endDate).toLocaleDateString()}</TableCell>
                                    <TableCell>${row.Invoice?.amount?.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status}
                                            color={row.status === 'confirmed' ? 'success' : row.status === 'cancelled' ? 'error' : 'warning'}
                                            size="small"
                                            sx={{ textTransform: 'capitalize' }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default MyReservations;
