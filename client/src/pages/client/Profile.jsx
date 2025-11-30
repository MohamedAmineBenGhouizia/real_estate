import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { NotificationContext } from '../../context/NotificationContext';
import api from '../../services/api';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Grid,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack
} from '@mui/material';
import { Save as SaveIcon, Lock as LockIcon } from '@mui/icons-material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const notify = useContext(NotificationContext);
    const [loading, setLoading] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phoneNumber: user?.phoneNumber || '',
        birthDate: user?.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : '',
        email: user?.email || ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (value) => {
        setFormData({ ...formData, phoneNumber: value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.put('/users/profile', formData);
            setUser({ ...user, ...response.data });
            notify.success('Informations mises à jour avec succès');
        } catch (error) {
            notify.error(error.response?.data?.message || 'Erreur lors de la mise à jour');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            notify.error('Les nouveaux mots de passe ne correspondent pas');
            return;
        }
        if (passwordData.newPassword.length < 8) {
            notify.error('Le mot de passe doit contenir au moins 8 caractères');
            return;
        }

        try {
            await api.put('/users/profile', {
                password: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            notify.success('Mot de passe modifié avec succès');
            setOpenPasswordModal(false);
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            notify.error(error.response?.data?.message || 'Erreur lors du changement de mot de passe');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontFamily: '"Playfair Display", serif' }}>
                Mon Profil
            </Typography>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Prénom"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Nom"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Email"
                                value={formData.email}
                                fullWidth
                                disabled
                                helperText="L'adresse email ne peut pas être modifiée"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ '& .react-tel-input .form-control': { width: '100%', height: '56px', borderColor: 'rgba(0, 0, 0, 0.23)' } }}>
                                <PhoneInput
                                    country={'tn'}
                                    value={formData.phoneNumber}
                                    onChange={handlePhoneChange}
                                    inputStyle={{ width: '100%', height: '56px', fontSize: '16px' }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Date de naissance"
                                name="birthDate"
                                type="date"
                                value={formData.birthDate}
                                onChange={handleChange}
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between">
                        <Button
                            variant="outlined"
                            startIcon={<LockIcon />}
                            onClick={() => setOpenPasswordModal(true)}
                        >
                            Changer le mot de passe
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            startIcon={<SaveIcon />}
                            disabled={loading}
                            sx={{ color: 'white' }}
                        >
                            {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                        </Button>
                    </Stack>
                </Box>
            </Paper>

            {/* Password Change Modal */}
            <Dialog open={openPasswordModal} onClose={() => setOpenPasswordModal(false)}>
                <DialogTitle>Changer le mot de passe</DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1, minWidth: 300 }}>
                        <TextField
                            label="Mot de passe actuel"
                            name="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            fullWidth
                        />
                        <TextField
                            label="Nouveau mot de passe"
                            name="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            fullWidth
                        />
                        <TextField
                            label="Confirmer le nouveau mot de passe"
                            name="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPasswordModal(false)}>Annuler</Button>
                    <Button onClick={handlePasswordSubmit} variant="contained" color="secondary" sx={{ color: 'white' }}>
                        Enregistrer
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Profile;
