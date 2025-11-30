import React, { useEffect, useState, useContext } from 'react';
import reservationService from '../../services/reservationService';
import { NotificationContext } from '../../context/NotificationContext';
import ModificationModal from '../../components/client/ModificationModal';
import { formatPrice } from '../../utils/formatPrice';
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
    Button,
    Tooltip
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

const MyReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const notify = useContext(NotificationContext);

    const fetchReservations = async () => {
        try {
            const data = await reservationService.getMyReservations();
            setReservations(data);
        } catch (err) {
            console.error(err);
            notify.error('Erreur lors du chargement des réservations');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleOpenModal = (reservation) => {
        setSelectedReservation(reservation);
        setModalOpen(true);
    };

    const handleModificationSubmit = async (id, data) => {
        try {
            await reservationService.requestModification(id, data);
            notify.success('Demande de modification envoyée avec succès');
            fetchReservations(); // Refresh list
        } catch (error) {
            notify.error(error.response?.data?.message || 'Erreur lors de la demande');
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'confirmed': return 'Confirmé';
            case 'pending': return 'En attente';
            case 'cancelled': return 'Annulé';
            default: return status;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'success';
            case 'pending': return 'warning';
            case 'cancelled': return 'error';
            default: return 'default';
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress sx={{ color: '#D4AF37' }} /></Box>;

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4, fontFamily: '"Playfair Display", serif' }}>
                Mes Réservations
            </Typography>

            {reservations.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary">Vous n'avez aucune réservation pour le moment.</Typography>
                </Paper>
            ) : (
                <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="reservations table">
                        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Propriété</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Arrivée</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Départ</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Prix Total</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Statut</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
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
                                    <TableCell>{new Date(row.startDate).toLocaleDateString('fr-FR')}</TableCell>
                                    <TableCell>{new Date(row.endDate).toLocaleDateString('fr-FR')}</TableCell>
                                    <TableCell>{formatPrice(row.Invoice?.amount)}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={getStatusLabel(row.status)}
                                            color={getStatusColor(row.status)}
                                            size="small"
                                            sx={{ textTransform: 'capitalize', color: 'white' }}
                                        />
                                        {row.modificationStatus === 'pending' && (
                                            <Chip
                                                label="Modif. en attente"
                                                color="info"
                                                size="small"
                                                sx={{ ml: 1, fontSize: '0.7rem' }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {(row.status === 'confirmed' || row.status === 'pending') && row.modificationStatus !== 'pending' && (
                                            <Tooltip title="Demander une modification">
                                                <Button
                                                    size="small"
                                                    startIcon={<EditIcon />}
                                                    onClick={() => handleOpenModal(row)}
                                                    sx={{ color: '#D4AF37' }}
                                                >
                                                    Modifier
                                                </Button>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {selectedReservation && (
                <ModificationModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleModificationSubmit}
                    reservation={selectedReservation}
                />
            )}
        </Container>
    );
};

export default MyReservations;
