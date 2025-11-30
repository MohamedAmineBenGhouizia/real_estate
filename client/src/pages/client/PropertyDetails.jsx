import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import propertyService from '../../services/propertyService';
import ReservationForm from '../../components/client/ReservationForm';
import {
    Container,
    Grid,
    Typography,
    Box,
    Chip,
    Stack,
    CircularProgress,
    Paper,
    Divider,
} from '@mui/material';
import {
    LocationOn as LocationIcon,
    Bed as BedIcon,
    Bathtub as BathIcon,
    SquareFoot as SquareFootIcon,
    Park as GardenIcon,
    Balcony as BalconyIcon,
} from '@mui/icons-material';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination as SwiperPagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await propertyService.getById(id);
                setProperty(data);
            } catch (err) {
                setError('Une erreur est survenue');
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
    if (error) return <Box sx={{ py: 8, textAlign: 'center' }}><Typography color="error">{error}</Typography></Box>;
    if (!property) return <Box sx={{ py: 8, textAlign: 'center' }}><Typography>Une erreur est survenue</Typography></Box>;

    return (
        <Box>
            {/* Hero Section */}
            <Box sx={{ position: 'relative', height: '60vh', width: '100%', bgcolor: 'black' }}>
                <Swiper
                    modules={[Navigation, SwiperPagination]}
                    navigation
                    pagination={{ clickable: true }}
                    style={{ width: '100%', height: '100%' }}
                >
                    {property.images && property.images.length > 0 ? (
                        property.images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <Box
                                    component="img"
                                    src={img}
                                    alt={`Property ${index + 1}`}
                                    sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                                />
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <img src="https://via.placeholder.com/1200x600?text=No+Image" alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </SwiperSlide>
                    )}
                </Swiper>

                {/* Info Card Overlay */}
                <Container maxWidth="lg" sx={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backdropFilter: 'blur(10px)', bgcolor: 'rgba(255,255,255,0.95)' }}>
                        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
                            <Box>
                                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom sx={{ fontFamily: '"Playfair Display", serif' }}>
                                    {property.title}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
                                    <LocationIcon color="secondary" />
                                    <Typography variant="body1">{property.address}</Typography>
                                </Stack>
                            </Box>
                            <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                                <Typography variant="h4" color="secondary" fontWeight="bold" sx={{ fontFamily: '"Playfair Display", serif' }}>
                                    {formatPrice(property.price)}
                                </Typography>
                                <Chip
                                    label={property.status === 'available' ? 'Disponible' : 'Réservé'}
                                    color={property.status === 'available' ? 'success' : 'warning'}
                                    sx={{ textTransform: 'capitalize', fontSize: '1rem', px: 1, mt: 1 }}
                                />
                            </Box>
                        </Stack>
                    </Paper>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Grid container spacing={5}>
                    {/* Main Content */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{ mb: 5 }}>
                            <Stack direction="row" spacing={2} sx={{ mb: 4 }} flexWrap="wrap" useFlexGap>
                                <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <BedIcon color="action" />
                                    <Typography variant="body1" fontWeight={500}>{property.bedrooms} Chambres</Typography>
                                </Paper>
                                <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <BathIcon color="action" />
                                    <Typography variant="body1" fontWeight={500}>{property.bathrooms} Salles de bain</Typography>
                                </Paper>
                                <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <SquareFootIcon color="action" />
                                    <Typography variant="body1" fontWeight={500}>{property.area} m²</Typography>
                                </Paper>
                                {property.hasGarden && (
                                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <GardenIcon color="success" />
                                        <Typography variant="body1" fontWeight={500}>Jardin</Typography>
                                    </Paper>
                                )}
                                {property.hasBalcony && (
                                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <BalconyIcon color="primary" />
                                        <Typography variant="body1" fontWeight={500}>Balcon</Typography>
                                    </Paper>
                                )}
                            </Stack>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontFamily: '"Playfair Display", serif' }}>
                                Description
                            </Typography>
                            <Typography variant="body1" paragraph color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                                {property.description || 'Aucune description disponible.'}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ position: 'sticky', top: 100 }}>
                            <ReservationForm property={property} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default PropertyDetails;
