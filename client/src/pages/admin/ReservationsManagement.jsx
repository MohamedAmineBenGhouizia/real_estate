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
    Stack,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';
import {
    CheckCircle as CheckIcon,
    Cancel as CancelIcon,
    EditCalendar as EditCalendarIcon,
    Person as PersonIcon,
    Phone as PhoneIcon,
    Email as EmailIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const ReservationsManagement = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modificationDialog, setModificationDialog] = useState(null);

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

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            await reservationService.updateStatus(id, status);
            fetchReservations();
        } catch (err) {
            alert('Erreur lors de la mise à jour du statut');
        }
    };

    const handleApproveModification = async () => {
        if (!modificationDialog) return;
        try {
            await reservationService.approveModification(modificationDialog.id);
            fetchReservations();
            setModificationDialog(null);
        } catch (err) {
            alert('Erreur lors de l\'approbation de la modification');
        }
    };

    const handleRejectModification = async () => {
        if (!modificationDialog) return;
        try {
            await reservationService.rejectModification(modificationDialog.id);
            fetchReservations();
            setModificationDialog(null);
        } catch (err) {
            alert('Erreur lors du rejet de la modification');
        }
    };

    if (loading) return <Typography>Chargement...</Typography>;

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4, fontFamily: '"Playfair Display", serif' }}>
                Gestion des Réservations
            </Typography>

            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Client</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Propriété</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Dates</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Statut</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations.map((res) => (
                            <TableRow key={res.id}>
                                <TableCell>#{res.id}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                                            {res.User?.firstName?.charAt(0) || <PersonIcon fontSize="small" />}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="body2" fontWeight="bold">
                                                {res.User?.firstName} {res.User?.lastName}
                                            </Typography>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <EmailIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                                                <Typography variant="caption" color="text.secondary">
                                                    {res.User?.email}
                                                </Typography>
                                            </Stack>
                                            {res.User?.phoneNumber && (
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <PhoneIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                                                    <Typography variant="caption" color="text.secondary">
                                                        {res.User?.phoneNumber}
                                                    </Typography>
                                                </Stack>
                                            )}
                                        </Box>
                                    </Stack>
                                </TableCell>
                                <TableCell>{res.Property?.title}</TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {format(new Date(res.startDate), 'dd MMM yyyy', { locale: fr })} - {format(new Date(res.endDate), 'dd MMM yyyy', { locale: fr })}
                                    </Typography>
                                    {res.modificationStatus === 'pending' && (
                                        <Typography variant="caption" color="warning.main" display="block">
                                            Modif: {format(new Date(res.requestedStartDate), 'dd MMM')} - {format(new Date(res.requestedEndDate), 'dd MMM')}
                                        </Typography>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Stack direction="column" spacing={0.5}>
                                        <Chip
                                            label={res.status === 'confirmed' ? 'Confirmé' : res.status === 'cancelled' ? 'Annulé' : 'En attente'}
                                            color={res.status === 'confirmed' ? 'success' : res.status === 'cancelled' ? 'error' : 'warning'}
                                            size="small"
                                            sx={{ textTransform: 'capitalize', color: 'white' }}
                                        />
                                        {res.modificationStatus === 'pending' && (
                                            <Chip
                                                label="Modif. demandée"
                                                color="info"
                                                size="small"
                                                sx={{ fontSize: '0.7rem' }}
                                            />
                                        )}
                                    </Stack>
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        {res.status === 'pending' && (
                                            <>
                                                <Tooltip title="Confirmer">
                                                    <IconButton color="success" onClick={() => handleStatusUpdate(res.id, 'confirmed')}>
                                                        <CheckIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Annuler">
                                                    <IconButton color="error" onClick={() => handleStatusUpdate(res.id, 'cancelled')}>
                                                        <CancelIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        )}
                                        {res.modificationStatus === 'pending' && (
                                            <Tooltip title="Gérer la modification">
                                                <IconButton color="info" onClick={() => setModificationDialog(res)}>
                                                    <EditCalendarIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modification Approval Dialog */}
            <Dialog
                open={Boolean(modificationDialog)}
                onClose={() => setModificationDialog(null)}
            >
                <DialogTitle>Demande de Modification</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Le client souhaite modifier les dates de réservation.
                    </DialogContentText>
                    <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                        <Typography variant="subtitle2" gutterBottom>Dates actuelles:</Typography>
                        <Typography variant="body2" gutterBottom>
                            {modificationDialog && `${format(new Date(modificationDialog.startDate), 'dd MMM yyyy')} - ${format(new Date(modificationDialog.endDate), 'dd MMM yyyy')}`}
                        </Typography>

                        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Nouvelles dates demandées:</Typography>
                        <Typography variant="body2" fontWeight="bold" color="primary">
                            {modificationDialog && `${format(new Date(modificationDialog.requestedStartDate), 'dd MMM yyyy')} - ${format(new Date(modificationDialog.requestedEndDate), 'dd MMM yyyy')}`}
                        </Typography>

                        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Raison:</Typography>
                        <Typography variant="body2" fontStyle="italic">
                            "{modificationDialog?.modificationReason}"
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRejectModification} color="error">
                        Refuser
                    </Button>
                    <Button onClick={handleApproveModification} color="success" variant="contained" sx={{ color: 'white' }}>
                        Accepter
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ReservationsManagement;
