import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useProperties from '../../hooks/useProperties';
import propertyService from '../../services/propertyService';
import { formatPrice } from '../../utils/formatPrice';
import {
    Box,
    Typography,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Tooltip
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const PropertiesManagement = () => {
    const { properties, loading, error, refetch } = useProperties();
    const [deleteId, setDeleteId] = useState(null);

    const handleDeleteClick = (id) => {
        setDeleteId(id);
    };

    const handleConfirmDelete = async () => {
        if (deleteId) {
            try {
                await propertyService.delete(deleteId);
                refetch();
            } catch (err) {
                alert('Erreur lors de la suppression');
            } finally {
                setDeleteId(null);
            }
        }
    };

    const getOccupancyStatus = (property) => {
        const today = new Date();
        const activeReservation = property.Reservations?.find(r =>
            new Date(r.startDate) <= today && new Date(r.endDate) >= today
        );
        return activeReservation ? true : false;
    };

    const getAvailabilityDate = (property) => {
        if (!property.Reservations || property.Reservations.length === 0) return 'Immédiate';

        const today = new Date();
        // Sort reservations by end date descending
        const sortedReservations = [...property.Reservations].sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
        const lastReservation = sortedReservations[0];

        if (new Date(lastReservation.endDate) < today) return 'Immédiate';

        return new Date(lastReservation.endDate).toLocaleDateString('fr-FR');
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: '"Playfair Display", serif' }}>
                    Gestion des Propriétés
                </Typography>
                <Button
                    component={Link}
                    to="/admin/properties/new"
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    sx={{ color: 'white' }}
                >
                    Ajouter une Propriété
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Titre</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Adresse</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Prix</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Surface</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Chambres</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Occupé</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Disponible le</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {properties.map((property) => {
                            const isOccupied = getOccupancyStatus(property);
                            const availableDate = getAvailabilityDate(property);

                            return (
                                <TableRow key={property.id}>
                                    <TableCell sx={{ fontWeight: 500 }}>{property.title}</TableCell>
                                    <TableCell>{property.address}</TableCell>
                                    <TableCell>{property.type}</TableCell>
                                    <TableCell>{formatPrice(property.price)}</TableCell>
                                    <TableCell>{property.area} m²</TableCell>
                                    <TableCell>{property.bedrooms}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={isOccupied ? 'Oui' : 'Non'}
                                            color={isOccupied ? 'error' : 'success'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{availableDate}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Modifier">
                                            <IconButton
                                                component={Link}
                                                to={`/admin/properties/${property.id}/edit`}
                                                color="primary"
                                                size="small"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Supprimer">
                                            <IconButton
                                                onClick={() => handleDeleteClick(property.id)}
                                                color="error"
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={Boolean(deleteId)}
                onClose={() => setDeleteId(null)}
            >
                <DialogTitle>Confirmer la suppression</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Êtes-vous sûr de vouloir supprimer cette propriété ? Cette action est irréversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)}>Annuler</Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PropertiesManagement;
