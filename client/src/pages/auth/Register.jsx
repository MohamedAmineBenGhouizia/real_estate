import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { AuthContext } from '../../context/AuthContext';
import { NotificationContext } from '../../context/NotificationContext';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Divider,
    Stack,
    InputAdornment,
    IconButton,
    Grid,
    LinearProgress,
    Alert
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        phoneNumber: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const { register } = useContext(AuthContext);
    const notify = useContext(NotificationContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'password') {
            calculatePasswordStrength(e.target.value);
        }
    };

    const handlePhoneChange = (value) => {
        setFormData({ ...formData, phoneNumber: value });
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        setPasswordStrength(strength);
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            notify.error('Les mots de passe ne correspondent pas');
            return false;
        }

        const age = new Date().getFullYear() - new Date(formData.birthDate).getFullYear();
        if (age < 18) {
            notify.error('Vous devez avoir au moins 18 ans');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            // Exclude confirmPassword from submission
            const { confirmPassword, ...submitData } = formData;
            await register(submitData);
            notify.success('Inscription réussie');
            navigate('/');
        } catch (error) {
            notify.error(error.response?.data?.message || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    const getStrengthColor = () => {
        if (passwordStrength < 50) return 'error';
        if (passwordStrength < 75) return 'warning';
        return 'success';
    };

    return (
        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '80vh', py: 4 }}>
            <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
                <Typography variant="h4" fontWeight="bold" align="center" gutterBottom sx={{ fontFamily: '"Playfair Display", serif' }}>
                    Créer un Compte
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
                    Rejoignez notre communauté exclusive
                </Typography>

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
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                required
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
                        <Grid item xs={12} md={6} />

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Mot de passe"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                fullWidth
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {formData.password && (
                                <Box sx={{ mt: 1 }}>
                                    <LinearProgress variant="determinate" value={passwordStrength} color={getStrengthColor()} />
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Confirmer le mot de passe"
                                name="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                size="large"
                                fullWidth
                                disabled={loading}
                                sx={{ py: 1.5, fontSize: '1rem', fontWeight: 'bold', mt: 2 }}
                            >
                                {loading ? 'Chargement...' : "S'inscrire"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ my: 4 }}>OU</Divider>

                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button variant="outlined" startIcon={<Google />} color="inherit" sx={{ width: '50%' }}>
                        Google
                    </Button>
                    <Button variant="outlined" startIcon={<Facebook />} color="inherit" sx={{ width: '50%' }}>
                        Facebook
                    </Button>
                </Stack>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Vous avez déjà un compte ?{' '}
                        <Link to="/login" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#D4AF37' }}>
                            Connexion
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
