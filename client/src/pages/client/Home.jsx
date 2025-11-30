import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import propertyService from '../../services/propertyService';
import PropertyCard from '../../components/client/PropertyCard';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Stack,
    TextField,
    InputAdornment,
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Search as SearchIcon, ArrowForward as ArrowForwardIcon, FormatQuote as QuoteIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await propertyService.getAll();
                setFeaturedProperties(data.slice(0, 6));
            } catch (error) {
                console.error('Failed to fetch properties', error);
            }
        };
        fetchProperties();
    }, []);

    const heroVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    height: '100vh',
                    width: '100%',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-27bfefd0c3c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.6)',
                        zIndex: -1,
                        animation: 'zoomIn 20s infinite alternate'
                    },
                    '@keyframes zoomIn': {
                        '0%': { transform: 'scale(1)' },
                        '100%': { transform: 'scale(1.1)' }
                    }
                }}
            >
                <Container maxWidth="lg" component={motion.div} initial="hidden" animate="visible" variants={heroVariants}>
                    <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
                        <Typography
                            variant="h1"
                            component="h1"
                            sx={{
                                mb: 2,
                                fontSize: { xs: '3rem', md: '4.5rem' },
                                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                            }}
                        >
                            Trouvez Votre <span style={{ color: '#D4AF37' }}>Sanctuaire</span> de Rêve
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 6,
                                fontWeight: 300,
                                opacity: 0.9,
                                fontSize: { xs: '1.2rem', md: '1.5rem' }
                            }}
                        >
                            Découvrez le summum de la vie de luxe avec notre collection exclusive de propriétés haut de gamme.
                        </Typography>

                        {/* Search Bar */}
                        <Paper
                            component={motion.div}
                            whileHover={{ scale: 1.02 }}
                            elevation={10}
                            sx={{
                                p: 1,
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '50px',
                                bgcolor: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(10px)',
                                maxWidth: '600px',
                                mx: 'auto'
                            }}
                        >
                            <TextField
                                fullWidth
                                placeholder="Rechercher par lieu, type de propriété..."
                                variant="standard"
                                InputProps={{
                                    disableUnderline: true,
                                    sx: { px: 3, py: 1, fontSize: '1.1rem' }
                                }}
                            />
                            <Button
                                component={Link}
                                to="/properties"
                                variant="contained"
                                color="secondary"
                                sx={{
                                    borderRadius: '50px',
                                    px: 4,
                                    py: 1.5,
                                    minWidth: '120px',
                                    fontWeight: 600
                                }}
                            >
                                Rechercher
                            </Button>
                        </Paper>
                    </Box>
                </Container>

                {/* Scroll Indicator */}
                <Box
                    component={motion.div}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    sx={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }}
                >
                    <ArrowForwardIcon sx={{ transform: 'rotate(90deg)', fontSize: 40, color: 'white', opacity: 0.8 }} />
                </Box>
            </Box>

            {/* Featured Properties Section */}
            <Box sx={{ py: 12, bgcolor: 'background.default' }}>
                <Container maxWidth="xl">
                    <Stack direction="row" justifyContent="space-between" alignItems="end" mb={6}>
                        <Box>
                            <Typography variant="overline" color="secondary" fontWeight="bold" letterSpacing={2}>
                                ANNONCES EXCLUSIVES
                            </Typography>
                            <Typography variant="h2" component="h2">
                                Propriétés en Vedette
                            </Typography>
                        </Box>
                        <Button
                            component={Link}
                            to="/properties"
                            endIcon={<ArrowForwardIcon />}
                            color="inherit"
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                        >
                            Voir Toutes les Propriétés
                        </Button>
                    </Stack>

                    <Grid container spacing={4}>
                        {featuredProperties.map((property, index) => (
                            <Grid item xs={12} md={4} key={property.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <PropertyCard property={property} />
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ mt: 6, display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
                        <Button component={Link} to="/properties" variant="outlined" color="inherit">
                            Voir Toutes les Propriétés
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Testimonials Section */}
            <Box sx={{ py: 12, bgcolor: '#1A1A1A', color: 'white' }}>
                <Container maxWidth="lg">
                    <Typography variant="h2" align="center" mb={8} sx={{ color: '#D4AF37' }}>
                        Témoignages Clients
                    </Typography>

                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay={{ delay: 5000 }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        style={{ paddingBottom: '50px' }}
                    >
                        {[1, 2, 3, 4].map((i) => (
                            <SwiperSlide key={i}>
                                <Paper
                                    sx={{
                                        p: 4,
                                        bgcolor: 'rgba(255,255,255,0.05)',
                                        color: 'white',
                                        borderRadius: 2,
                                        height: '100%'
                                    }}
                                >
                                    <QuoteIcon sx={{ fontSize: 40, color: '#D4AF37', mb: 2 }} />
                                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', opacity: 0.8 }}>
                                        "L'attention aux détails et le niveau de service fourni étaient absolument exceptionnels. J'ai trouvé la maison de mes rêves en quelques semaines."
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={2} mt={3}>
                                        <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#D4AF37' }} />
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="bold">Sarah Johnson</Typography>
                                            <Typography variant="caption" sx={{ opacity: 0.6 }}>Acheteur de Luxe</Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Container>
            </Box>

            {/* Newsletter Section */}
            <Box sx={{ py: 12, bgcolor: 'white' }}>
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <Stack alignItems="center" spacing={3} sx={{ textAlign: 'center' }}>
                        <Typography variant="h3">Restez Informé</Typography>
                        <Typography variant="body1" color="text.secondary" maxWidth="600px">
                            Inscrivez-vous à notre newsletter pour recevoir un accès exclusif aux offres hors marché et aux informations sur l'immobilier de luxe.
                        </Typography>
                        <Paper
                            elevation={0}
                            sx={{
                                display: 'flex',
                                width: '100%',
                                maxWidth: '500px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '50px',
                                p: 0.5,
                                pl: 3
                            }}
                        >
                            <TextField
                                fullWidth
                                placeholder="Adresse Email"
                                variant="standard"
                                InputProps={{ disableUnderline: true }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ borderRadius: '50px', px: 4 }}
                            >
                                S'abonner
                            </Button>
                        </Paper>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

// Helper for Paper since I forgot to import it
import Paper from '@mui/material/Paper';

export default Home;
