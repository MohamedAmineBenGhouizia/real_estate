import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useProperties from '../../hooks/useProperties';
import propertyService from '../../services/propertyService';
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
                alert('Failed to delete property');
            } finally {
                setDeleteId(null);
            }
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    Properties
                </Typography>
                <Button
                    component={Link}
                    to="/admin/properties/new"
                    variant="contained"
                    startIcon={<AddIcon />}
                >
                    Add Property
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: 'background.default' }}>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {properties.map((property) => (
                            <TableRow key={property.id}>
                                <TableCell sx={{ fontWeight: 500 }}>{property.title}</TableCell>
                                <TableCell>{property.type}</TableCell>
                                <TableCell>${property.price?.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={property.status}
                                        color={property.status === 'available' ? 'success' : 'warning'}
                                        size="small"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        component={Link}
                                        to={`/admin/properties/${property.id}/edit`}
                                        color="primary"
                                        size="small"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDeleteClick(property.id)}
                                        color="error"
                                        size="small"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={Boolean(deleteId)}
                onClose={() => setDeleteId(null)}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this property? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PropertiesManagement;
