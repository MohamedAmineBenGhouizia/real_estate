import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Stack,
    Chip,
    FormControl,
    InputLabel,
    Select,
    Tooltip
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import userService from '../../services/userService';
import { NotificationContext } from '../../context/NotificationContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [roleFilter, setRoleFilter] = useState('all');
    const notify = useContext(NotificationContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: 'client'
    });

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (error) {
            notify.error('Erreur lors du chargement des utilisateurs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleOpenDialog = (user = null) => {
        if (user) {
            setCurrentUser(user);
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email,
                phoneNumber: user.phoneNumber || '',
                role: user.role,
                password: '' // Don't show password
            });
        } else {
            setCurrentUser(null);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                password: '',
                role: 'client'
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentUser(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentUser) {
                await userService.updateUser(currentUser.id, formData);
                notify.success('Utilisateur mis à jour avec succès');
            } else {
                await userService.createUser(formData);
                notify.success('Utilisateur créé avec succès');
            }
            fetchUsers();
            handleCloseDialog();
        } catch (error) {
            notify.error(error.response?.data?.message || 'Échec de l\'opération');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            try {
                await userService.deleteUser(id);
                notify.success('Utilisateur supprimé avec succès');
                fetchUsers();
            } catch (error) {
                notify.error('Erreur lors de la suppression');
            }
        }
    };

    const filteredUsers = roleFilter === 'all'
        ? users
        : users.filter(user => user.role === roleFilter);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'fullName',
            headerName: 'Nom Complet',
            flex: 1,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
        },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phoneNumber', headerName: 'Téléphone', width: 130 },
        {
            field: 'role',
            headerName: 'Rôle',
            width: 130,
            renderCell: (params) => (
                <Chip
                    label={params.value === 'admin' ? 'Admin' : 'Client'}
                    color={params.value === 'admin' ? 'primary' : 'default'}
                    size="small"
                />
            )
        },
        {
            field: 'createdAt',
            headerName: 'Inscrit le',
            width: 150,
            valueFormatter: (value) => value ? format(new Date(value), 'dd MMM yyyy', { locale: fr }) : '-'
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Modifier">
                        <IconButton size="small" onClick={() => handleOpenDialog(params.row)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer">
                        <IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ),
        },
    ];

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: '"Playfair Display", serif' }}>
                    Gestion des Utilisateurs
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    sx={{ color: 'white' }}
                >
                    Ajouter un Utilisateur
                </Button>
            </Stack>

            <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>Filtrer par Rôle</InputLabel>
                    <Select
                        value={roleFilter}
                        label="Filtrer par Rôle"
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <MenuItem value="all">Tous les rôles</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="client">Client</MenuItem>
                    </Select>
                </FormControl>
            </Paper>

            <Paper sx={{ height: 600, width: '100%', borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <DataGrid
                    rows={filteredUsers}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 25, 50]}
                    checkboxSelection
                    disableSelectionOnClick
                    loading={loading}
                    components={{ Toolbar: GridToolbar }}
                    sx={{ border: 'none' }}
                />
            </Paper>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{currentUser ? 'Modifier l\'Utilisateur' : 'Ajouter un Utilisateur'}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Stack spacing={2}>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="Prénom"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Nom"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    fullWidth
                                    required
                                />
                            </Stack>
                            <TextField
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Téléphone"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                fullWidth
                            />
                            {!currentUser && (
                                <TextField
                                    label="Mot de passe"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    fullWidth
                                    required
                                />
                            )}
                            <TextField
                                select
                                label="Rôle"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                fullWidth
                            >
                                <MenuItem value="client">Client</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </TextField>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Annuler</Button>
                        <Button type="submit" variant="contained" color="secondary" sx={{ color: 'white' }}>
                            {currentUser ? 'Mettre à jour' : 'Créer'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default UsersManagement;
