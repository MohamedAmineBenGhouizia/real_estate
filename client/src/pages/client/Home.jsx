import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Paper,
    Stack,
} from '@mui/material';
import { Search as SearchIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    py: 12,
                    mb: 6,
                    borderRadius: { xs: 0, md: 4 },
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundImage: 'linear-gradient(rgba(25, 118, 210, 0.9), rgba(25, 118, 210, 0.8)), url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                                Find Your Dream Home Today
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                                Discover the perfect property from our extensive catalog of apartments, houses, and villas.
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Button
                                    component={Link}
                                    to="/properties"
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    endIcon={<SearchIcon />}
                                    sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}
                                >
                                    Browse Properties
                                </Button>
                                {!user && (
                                    <Button
                                        component={Link}
                                        to="/register"
                                        variant="outlined"
                                        color="inherit"
                                        size="large"
                                        sx={{ py: 1.5, px: 4, fontSize: '1.1rem', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                                    >
                                        Join Us
                                    </Button>
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ mb: 8 }}>
                <Typography variant="h4" component="h2" fontWeight="bold" textAlign="center" gutterBottom sx={{ mb: 6 }}>
                    Why Choose Us?
                </Typography>
                <Grid container spacing={4}>
                    {[
                        { title: 'Wide Range of Properties', desc: 'From cozy apartments to luxury villas, we have it all.' },
                        { title: 'Trusted by Thousands', desc: 'Our reputation is built on trust and customer satisfaction.' },
                        { title: 'Easy Financing', desc: 'We help you find the best mortgage rates and financing options.' },
                    ].map((feature, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Paper elevation={0} sx={{ p: 4, height: '100%', bgcolor: 'background.default', borderRadius: 4, textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    {feature.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {feature.desc}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 8, borderRadius: { xs: 0, md: 4 } }}>
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Ready to find your new home?
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                        Join our community and start your journey today.
                    </Typography>
                    <Button
                        component={Link}
                        to="/properties"
                        variant="contained"
                        color="primary" // Uses theme primary (Blue) on Secondary (Orange) background for contrast
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ bgcolor: 'white', color: 'secondary.main', '&:hover': { bgcolor: 'grey.100' } }}
                    >
                        Get Started
                    </Button>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;
