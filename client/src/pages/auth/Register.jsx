import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register } = useContext(AuthContext);
    const notify = useContext(NotificationContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(formData);
            notify.success('Registration successful');
            navigate('/');
        } catch (error) {
            notify.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '80vh' }}>
            <Paper elevation={3} sx={{ p: 5, borderRadius: 3 }}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                    Create Account
                </Typography>
                <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
                    Join us to start your real estate journey
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Password"
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

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={loading}
                            sx={{ py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </Button>
                    </Stack>
                </Box>

                <Divider sx={{ my: 4 }}>OR</Divider>

                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" fullWidth startIcon={<Google />} color="inherit">
                        Google
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<Facebook />} color="inherit">
                        Facebook
                    </Button>
                </Stack>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Already have an account?{' '}
                        <Link to="/login" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#1976D2' }}>
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
